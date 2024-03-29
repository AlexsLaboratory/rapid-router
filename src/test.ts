import { log } from 'node:console';
import { IncomingMessage, ServerResponse } from 'node:http';
import http from 'node:http';
import { RapidRouter } from './index.js';

const PORT = 3000;

const router = new RapidRouter();
router.use((req: IncomingMessage, res: ServerResponse) => {
  log('Middleware Ran!!!');
  log(`${req.method} ${req.url}`);
});
router.get('/account', (req: IncomingMessage, res: ServerResponse) => {
  res
    .writeHead(200, { 'Content-Type': 'application/json' })
    .end(JSON.stringify({ message: 'Get Function Ran!!!' }));
});
router.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

// const server = http.createServer((req, res) => {
//   const router = new RapidRouter(req, res);
//   router.get('/account', (req: IncomingMessage, res: ServerResponse) => {
//       log("Get Function Ran!!!", res.statusCode);
//   });
// });

// server.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`)
// })
