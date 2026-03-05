import { createServer } from 'http';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

const PORT = 3000;

const server = createServer((req, res) => {
	if (req.url === '/view-image' && (req.method === 'GET' || req.method === 'HEAD')) {
		const imagePath = join(__dirname, 'images', 'veryhappydog.jpg');

		if (!existsSync(imagePath)) {
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

		createReadStream(imagePath).pipe(res);
		return;
	}

	res.statusCode = 404;
	res.end('Route not found');
});

server.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});