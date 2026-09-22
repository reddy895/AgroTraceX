// frontend/server/index.js
import http from 'node:http';
import { handleApiRequest } from './apiServer.js';

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url && req.url.startsWith('/api')) {
    handleApiRequest(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`[AgroTraceX API Server] Running on http://localhost:${PORT}`);
});
