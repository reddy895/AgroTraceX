// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const ROLES = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
  // Backward compatibility alias for demo persona views
  COMPANY: 'CLIENT',
  AGRONOMIST: 'CLIENT',
  FIELD_OFFICER: 'CLIENT'
};

export const STATUSES = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  REVOKED: 'REVOKED'
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('agrotracex_token') || '');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('agrotracex_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    // Default demo approved client so initial landing is smooth
    return {
      id: "USR-101",
      name: "Dr. Ananya Sen",
      email: "ananya.sen@novisagro.com",
      role: ROLES.CLIENT,
      status: STATUSES.APPROVED,
      organization: "Novis AgroSciences Global",
      designation: "VP of Plant Genetics & Field R&D",
      avatar: "AS"
    };
  });
  const [loading, setLoading] = useState(false);
  const [sessionVerified, setSessionVerified] = useState(false);

  // Helper to persist auth state
  const saveSession = (authToken, user) => {
    setToken(authToken);
    if (user) {
      const userWithAvatar = {
        ...user,
        avatar: user.avatar || user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
      };
      setCurrentUser(userWithAvatar);
      localStorage.setItem('agrotracex_token', authToken);
      localStorage.setItem('agrotracex_user', JSON.stringify(userWithAvatar));
    }
  };

  // Re-verify session against live backend
  const refreshSession = useCallback(async () => {
    const activeToken = localStorage.getItem('agrotracex_token');
    if (!activeToken) {
      setSessionVerified(true);
      return null;
    }
    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${activeToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          saveSession(activeToken, data.user);
          setSessionVerified(true);
          return data.user;
        }
      } else {
        // Token invalid or expired
        localStorage.removeItem('agrotracex_token');
        localStorage.removeItem('agrotracex_user');
        setToken('');
      }
    } catch (err) {
      console.warn('Backend session verification failed, using local session state:', err);
    } finally {
      setSessionVerified(true);
    }
    return null;
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  // Client Login (Strictly Client)
  const loginClient = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to sign in.');
      }
      saveSession(data.token, data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Dedicated Admin Login (Strictly Admin)
  const loginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid administrator credentials.');
      }
      saveSession(data.token, data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Client Registration (Produces PENDING state)
  const registerClient = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit registration request.');
      }
      saveSession(data.token, data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setToken('');
    setCurrentUser(null);
    localStorage.removeItem('agrotracex_token');
    localStorage.removeItem('agrotracex_user');
  };

  // Backward compatibility wrapper for old components
  const switchRole = (newRole) => {
    if (newRole === ROLES.ADMIN) {
      // Mock switch to admin
      const adminUser = {
        id: "ADMIN-001",
        name: "Dr. Alok Verma",
        email: "admin@agrotracex.com",
        role: ROLES.ADMIN,
        status: STATUSES.APPROVED,
        organization: "AgroTraceX Platform Operations",
        designation: "Principal Operations Lead",
        avatar: "AV"
      };
      saveSession('admin_mock_token', adminUser);
    } else {
      const clientUser = {
        id: "USR-101",
        name: "Dr. Ananya Sen",
        email: "ananya.sen@novisagro.com",
        role: ROLES.CLIENT,
        status: STATUSES.APPROVED,
        organization: "Novis AgroSciences Global",
        designation: "VP of Plant Genetics & Field R&D",
        avatar: "AS"
      };
      saveSession('client_mock_token', clientUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        loading,
        sessionVerified,
        loginClient,
        loginAdmin,
        registerClient,
        logout,
        switchRole,
        refreshSession,
        roles: ROLES,
        statuses: STATUSES
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
