import { IncomingMessage, ServerResponse, createServer } from 'node:http';
import { log } from 'node:console';
import { RequestVerb, Route } from './types/index.js';

export class RapidRouter {
  private routes: Route[] = [];
  private req: IncomingMessage;
  private res: ServerResponse;

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;
  }

  private addRoute(method: RequestVerb, url: string, handler: Function) {
    this.routes.push({ method, url, handler })
  }

  private findRoute(method: RequestVerb, url: string) {
    return this.routes.find(route => route.method === method && route.url === url);
  }

  public get(url: string, handler: Function) {
    this.addRoute(RequestVerb.GET, url, handler);
    // parseUrl('/account/:id/:name', '/account/1234/John');
  }

  public listen(port: number, callback: () => void) {
    createServer((req, res) => {
      const method = req.method?.toUpperCase() as RequestVerb;
      const url = req.url?.toLowerCase() as string;
      const route = this.findRoute(method, url);
      if (route) {
        return route.handler.apply(this, [req, res]);
      }
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found' }));
    }).listen(port, callback);
  }
}