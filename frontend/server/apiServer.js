// frontend/server/apiServer.js
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, 'db.json');

const JWT_SECRET = process.env.JWT_SECRET || 'agrotracex_enterprise_secret_key_2026';

// --- Database Helper Functions ---
export const readDatabase = () => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = { users: [], activities: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database:', err);
    return { users: [], activities: [] };
  }
};

export const writeDatabase = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing database:', err);
    return false;
  }
};

// --- Token Security Utilities (HMAC-SHA256) ---
export const generateToken = (payload) => {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days validity
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
};

export const verifyToken = (token) => {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;

  const expectedSignature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
};

export const sanitizeUser = (user) => {
  if (!user) return null;
  const { passwordHash: _, ...safe } = user;
  return safe;
};

// Extract token from Bearer header
export const extractBearerToken = (req) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader || typeof authHeader !== 'string') return null;
  const match = authHeader.match(/^Bearer\s+(.*)$/i);
  return match ? match[1] : null;
};

// --- Route Handlers ---

export const handleApiRequest = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method.toUpperCase();

  // Helper to send JSON response
  const sendJson = (status, data) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.end(JSON.stringify(data));
  };

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.end();
    return;
  }

  // Parse JSON body helper
  const parseBody = () =>
    new Promise((resolve) => {
      let bodyStr = '';
      req.on('data', (chunk) => {
        bodyStr += chunk;
      });
      req.on('end', () => {
        try {
          resolve(bodyStr ? JSON.parse(bodyStr) : {});
        } catch {
          resolve({});
        }
      });
    });

  // Verify auth middleware helper
  const authenticate = () => {
    const token = extractBearerToken(req);
    if (!token) return null;
    const decoded = verifyToken(token);
    if (!decoded) return null;
    const db = readDatabase();
    const user = db.users.find((u) => u.id === decoded.userId);
    return user ? sanitizeUser(user) : null;
  };

  try {
    // -------------------------------------------------------------
    // AUTH ROUTES
    // -------------------------------------------------------------

    // POST /api/auth/register
    if (pathname === '/api/auth/register' && method === 'POST') {
      const body = await parseBody();
      const { name, email, phone, organization, designation, reason, password } = body;

      if (!name || !email || !password || !organization) {
        return sendJson(400, {
          success: false,
          error: 'Missing required registration fields (Full name, Email, Organization, Password).'
        });
      }

      const db = readDatabase();
      const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return sendJson(409, {
          success: false,
          error: 'An account or access request with this email already exists.'
        });
      }

      const now = new Date().toISOString();
      const newUserId = `USR-${Date.now().toString().slice(-6)}`;
      const newUser = {
        id: newUserId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : '',
        organization: organization.trim(),
        designation: designation ? designation.trim() : 'Field Trial Lead',
        passwordHash: password, // For mock persistence; in strict production use bcrypt
        role: 'CLIENT',
        status: 'PENDING',
        reason: reason ? reason.trim() : 'Field trial operations & seed traceability evaluation',
        createdAt: now,
        updatedAt: now
      };

      db.users.unshift(newUser);

      // Audit log entry
      db.activities.unshift({
        id: `ACT-${Date.now()}`,
        type: 'USER_REGISTRATION',
        title: 'New Client Request',
        description: `${newUser.name} (${newUser.organization}) submitted workspace registration request.`,
        userId: newUserId,
        actor: newUser.name,
        timestamp: now
      });

      writeDatabase(db);

      const token = generateToken({
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status
      });

      return sendJson(201, {
        success: true,
        message: 'Access Request Submitted',
        token,
        user: sanitizeUser(newUser)
      });
    }

    // POST /api/auth/login (Client Login)
    if (pathname === '/api/auth/login' && method === 'POST') {
      const body = await parseBody();
      const { email, password } = body;

      if (!email || !password) {
        return sendJson(400, {
          success: false,
          error: 'Please provide both email and password.'
        });
      }

      const db = readDatabase();
      const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        return sendJson(401, {
          success: false,
          error: 'No account found with this email address.'
        });
      }

      // Check if user is attempting to login as Admin on the Client endpoint
      if (user.role === 'ADMIN') {
        return sendJson(403, {
          success: false,
          error: 'Administrator credentials cannot be used on Client login. Please use the Admin Portal at /admin/login.'
        });
      }

      if (user.passwordHash !== password) {
        return sendJson(401, {
          success: false,
          error: 'Invalid password. Please check your credentials.'
        });
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
        status: user.status
      });

      return sendJson(200, {
        success: true,
        token,
        user: sanitizeUser(user)
      });
    }

    // POST /api/auth/admin-login (Admin Dedicated Login)
    if (pathname === '/api/auth/admin-login' && method === 'POST') {
      const body = await parseBody();
      const { email, password } = body;

      if (!email || !password) {
        return sendJson(400, {
          success: false,
          error: 'Please provide both email and password.'
        });
      }

      const db = readDatabase();
      const admin = db.users.find(
        (u) => u.role === 'ADMIN' && u.email.toLowerCase() === email.toLowerCase()
      );

      if (!admin) {
        return sendJson(401, {
          success: false,
          error: 'Access denied: Provided email is not an authorized administrator.'
        });
      }

      if (admin.passwordHash !== password) {
        return sendJson(401, {
          success: false,
          error: 'Invalid administrator password.'
        });
      }

      const token = generateToken({
        userId: admin.id,
        email: admin.email,
        role: 'ADMIN',
        status: 'APPROVED'
      });

      return sendJson(200, {
        success: true,
        token,
        user: sanitizeUser(admin)
      });
    }

    // GET /api/auth/me (Current Session Verification)
    if (pathname === '/api/auth/me' && method === 'GET') {
      const currentUser = authenticate();
      if (!currentUser) {
        return sendJson(401, {
          success: false,
          error: 'Unauthenticated or session expired. Please sign in again.'
        });
      }

      return sendJson(200, {
        success: true,
        user: currentUser
      });
    }

    // -------------------------------------------------------------
    // ADMIN CONTROL ROUTES (Requires role === ADMIN)
    // -------------------------------------------------------------

    // GET /api/admin/overview
    if (pathname === '/api/admin/overview' && method === 'GET') {
      const currentUser = authenticate();
      if (!currentUser || currentUser.role !== 'ADMIN') {
        return sendJson(403, {
          success: false,
          error: 'Forbidden: Administrative authorization required.'
        });
      }

      const db = readDatabase();
      const clients = db.users.filter((u) => u.role === 'CLIENT');
      const pendingCount = clients.filter((c) => c.status === 'PENDING').length;
      const approvedCount = clients.filter((c) => c.status === 'APPROVED').length;
      const rejectedCount = clients.filter((c) => c.status === 'REJECTED').length;
      const revokedCount = clients.filter((c) => c.status === 'REVOKED').length;

      // Clients registered in the last 7 days
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const recentlyRegistered = clients.filter(
        (c) => new Date(c.createdAt).getTime() > sevenDaysAgo
      );

      return sendJson(200, {
        success: true,
        metrics: {
          totalClients: clients.length,
          pendingCount,
          approvedCount,
          rejectedCount,
          revokedCount,
          activeCount: approvedCount,
          recentRegistrationsCount: recentlyRegistered.length,
          accessChangesCount: db.activities.filter((a) =>
            ['ACCESS_APPROVED', 'ACCESS_REJECTED', 'ACCESS_REVOKED'].includes(a.type)
          ).length
        },
        pendingRequests: clients.filter((c) => c.status === 'PENDING'),
        recentActivities: db.activities.slice(0, 15)
      });
    }

    // GET /api/admin/clients
    if (pathname === '/api/admin/clients' && method === 'GET') {
      const currentUser = authenticate();
      if (!currentUser || currentUser.role !== 'ADMIN') {
        return sendJson(403, {
          success: false,
          error: 'Forbidden: Administrative authorization required.'
        });
      }

      const statusFilter = url.searchParams.get('status');
      const db = readDatabase();
      let clients = db.users.filter((u) => u.role === 'CLIENT');

      if (statusFilter && statusFilter.toUpperCase() !== 'ALL') {
        clients = clients.filter((c) => c.status === statusFilter.toUpperCase());
      }

      return sendJson(200, {
        success: true,
        clients: clients.map(sanitizeUser)
      });
    }

    // POST /api/admin/clients/:id/approve
    const approveMatch = pathname.match(/^\/api\/admin\/clients\/([^/]+)\/approve$/);
    if (approveMatch && method === 'POST') {
      const currentUser = authenticate();
      if (!currentUser || currentUser.role !== 'ADMIN') {
        return sendJson(403, {
          success: false,
          error: 'Forbidden: Administrative authorization required.'
        });
      }

      const clientId = approveMatch[1];
      const db = readDatabase();
      const clientIndex = db.users.findIndex((u) => u.id === clientId);

      if (clientIndex === -1) {
        return sendJson(404, { success: false, error: 'Client not found.' });
      }

      const client = db.users[clientIndex];
      const now = new Date().toISOString();
      client.status = 'APPROVED';
      client.updatedAt = now;

      db.activities.unshift({
        id: `ACT-${Date.now()}`,
        type: 'ACCESS_APPROVED',
        title: 'Workspace Access Approved',
        description: `Admin approved full workspace access for ${client.name} (${client.organization}).`,
        userId: client.id,
        actor: currentUser.name,
        timestamp: now
      });

      writeDatabase(db);

      return sendJson(200, {
        success: true,
        message: `Client ${client.name} approved successfully.`,
        client: sanitizeUser(client)
      });
    }

    // POST /api/admin/clients/:id/reject
    const rejectMatch = pathname.match(/^\/api\/admin\/clients\/([^/]+)\/reject$/);
    if (rejectMatch && method === 'POST') {
      const currentUser = authenticate();
      if (!currentUser || currentUser.role !== 'ADMIN') {
        return sendJson(403, {
          success: false,
          error: 'Forbidden: Administrative authorization required.'
        });
      }

      const clientId = rejectMatch[1];
      const body = await parseBody();
      const reason = body.reason || 'Did not meet institutional verification criteria';

      const db = readDatabase();
      const clientIndex = db.users.findIndex((u) => u.id === clientId);

      if (clientIndex === -1) {
        return sendJson(404, { success: false, error: 'Client not found.' });
      }

      const client = db.users[clientIndex];
      const now = new Date().toISOString();
      client.status = 'REJECTED';
      client.updatedAt = now;

      db.activities.unshift({
        id: `ACT-${Date.now()}`,
        type: 'ACCESS_REJECTED',
        title: 'Access Request Declined',
        description: `Admin rejected access for ${client.name} (${client.organization}). Reason: ${reason}`,
        userId: client.id,
        actor: currentUser.name,
        timestamp: now
      });

      writeDatabase(db);

      return sendJson(200, {
        success: true,
        message: `Client ${client.name} access request rejected.`,
        client: sanitizeUser(client)
      });
    }

    // POST /api/admin/clients/:id/revoke
    const revokeMatch = pathname.match(/^\/api\/admin\/clients\/([^/]+)\/revoke$/);
    if (revokeMatch && method === 'POST') {
      const currentUser = authenticate();
      if (!currentUser || currentUser.role !== 'ADMIN') {
        return sendJson(403, {
          success: false,
          error: 'Forbidden: Administrative authorization required.'
        });
      }

      const clientId = revokeMatch[1];
      const body = await parseBody();
      const reason = body.reason || 'Administrative revocation';

      const db = readDatabase();
      const clientIndex = db.users.findIndex((u) => u.id === clientId);

      if (clientIndex === -1) {
        return sendJson(404, { success: false, error: 'Client not found.' });
      }

      const client = db.users[clientIndex];
      const now = new Date().toISOString();
      client.status = 'REVOKED';
      client.updatedAt = now;

      db.activities.unshift({
        id: `ACT-${Date.now()}`,
        type: 'ACCESS_REVOKED',
        title: 'Workspace Access Revoked',
        description: `Admin revoked workspace access for ${client.name} (${client.organization}). Reason: ${reason}`,
        userId: client.id,
        actor: currentUser.name,
        timestamp: now
      });

      writeDatabase(db);

      return sendJson(200, {
        success: true,
        message: `Client ${client.name} workspace access has been revoked.`,
        client: sanitizeUser(client)
      });
    }

    // GET /api/admin/activity
    if (pathname === '/api/admin/activity' && method === 'GET') {
      const currentUser = authenticate();
      if (!currentUser || currentUser.role !== 'ADMIN') {
        return sendJson(403, {
          success: false,
          error: 'Forbidden: Administrative authorization required.'
        });
      }

      const db = readDatabase();
      return sendJson(200, {
        success: true,
        activities: db.activities
      });
    }

    // -------------------------------------------------------------
    // PROTECTED PLATFORM DATA ROUTE (Requires APPROVED CLIENT or ADMIN)
    // -------------------------------------------------------------
    if (pathname === '/api/platform/verify' && method === 'GET') {
      const currentUser = authenticate();
      if (!currentUser) {
        return sendJson(401, {
          success: false,
          error: 'UNAUTHENTICATED',
          message: 'Please sign in to access the platform.'
        });
      }

      if (currentUser.role === 'CLIENT' && currentUser.status !== 'APPROVED') {
        return sendJson(403, {
          success: false,
          error: 'FORBIDDEN_STATUS',
          status: currentUser.status,
          message: `Workspace access is not permitted while account is ${currentUser.status}.`
        });
      }

      return sendJson(200, {
        success: true,
        status: currentUser.status,
        message: 'Access granted.'
      });
    }

    // Not Found
    return sendJson(404, {
      success: false,
      error: `API route not found: ${method} ${pathname}`
    });
  } catch (error) {
    console.error('API Error:', error);
    return sendJson(500, {
      success: false,
      error: 'Internal server error processing request.'
    });
  }
};
