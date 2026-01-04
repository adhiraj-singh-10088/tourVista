// Simple static server for development: serves backend `public/img` folder
// Run from `Client` folder: `node static-server.js`

const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
};

const PUBLIC_IMG_DIR = path.resolve(__dirname, '../public/img');
const PORT = process.env.STATIC_PORT || 3001;

const server = http.createServer((req, res) => {
  // Expect requests like /img/tours/tour-1-cover.jpg
  if (!req.url.startsWith('/img/')) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  const relPath = req.url.replace(/^\/img\//, '');
  const filePath = path.join(PUBLIC_IMG_DIR, relPath);

  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_IMG_DIR)) {
    res.statusCode = 403;
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      return res.end('Not found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = mime[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on('error', () => res.end());
  });
});

server.listen(PORT, () => {
  console.log(`Static image server running on http://localhost:${PORT}`);
  console.log(`Serving images from ${PUBLIC_IMG_DIR}`);
});
