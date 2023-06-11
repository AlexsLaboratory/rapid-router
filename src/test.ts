import { log } from 'node:console';
import { IncomingMessage, ServerResponse } from 'node:http';
import http from 'node:http';
import { RapidRouter } from './index.js';

const PORT = 3000;

const server = http.createServer((req, res) => {
  const router = new RapidRouter(req, res);
  router.get('/account', (req: IncomingMessage, res: ServerResponse) => {
      log("Get Function Ran!!!", res.statusCode);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})