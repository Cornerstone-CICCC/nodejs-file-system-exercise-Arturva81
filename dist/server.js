"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs_1 = require("fs");
const path_1 = require("path");
const PORT = 3000;
const server = (0, http_1.createServer)((req, res) => {
    if (req.url === '/view-image' && (req.method === 'GET' || req.method === 'HEAD')) {
        const imagePath = (0, path_1.join)(__dirname, 'images', 'veryhappydog.jpg');
        if (!(0, fs_1.existsSync)(imagePath)) {
            res.statusCode = 404;
            res.end('Image not found');
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpeg');
        if (req.method === 'HEAD') {
            res.end();
            return;
        }
        (0, fs_1.createReadStream)(imagePath).pipe(res);
        return;
    }
    res.statusCode = 404;
    res.end('Route not found');
});
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
