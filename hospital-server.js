#!/usr/bin/env node

/**
 * Simple HTTP server for hosting the QR Code Processor PWA
 * in a hospital environment for offline access
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, 'dist');

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  let pathname = url.parse(req.url).pathname;
  
  // Default to index.html for root requests
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  const filePath = path.join(DIST_DIR, pathname);
  
  // Security check - prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403, {'Content-Type': 'text/plain'});
    res.end('Forbidden');
    return;
  }
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If file not found, serve index.html for SPA routing
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(DIST_DIR, 'index.html'), (indexErr, indexData) => {
          if (indexErr) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/html',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            });
            res.end(indexData);
          }
        });
      } else {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
    } else {
      const contentType = getContentType(filePath);
      
      // Set appropriate headers for PWA
      const headers = {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      };
      
      // Cache static assets but not the service worker or manifest
      if (pathname !== '/sw.js' && pathname !== '/manifest.webmanifest') {
        headers['Cache-Control'] = 'public, max-age=31536000'; // 1 year
      } else {
        headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      }
      
      res.writeHead(200, headers);
      res.end(data);
    }
  });
});

// Handle server startup
server.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(60));
  console.log('🏥 HOSPITAL PWA SERVER STARTED');
  console.log('='.repeat(60));
  console.log(`📱 QR Code Processor PWA is running at:`);
  console.log(`   Local:    http://localhost:${PORT}`);
  console.log(`   Network:  http://[hospital-ip]:${PORT}`);
  console.log('');
  console.log('📋 STAFF INSTALLATION INSTRUCTIONS:');
  console.log('1. Open the URL above in Chrome/Edge browser');
  console.log('2. Look for "Install" button or "Add to Home Screen"');
  console.log('3. Once installed, app works offline forever!');
  console.log('');
  console.log('🔧 To stop server: Press Ctrl+C');
  console.log('='.repeat(60));
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down hospital PWA server...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});

// Error handling
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Try a different port:`);
    console.error(`   PORT=3001 node hospital-server.js`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
}); 