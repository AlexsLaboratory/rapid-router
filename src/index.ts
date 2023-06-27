import { createServer } from 'node:http';
import { Middleware, RequestVerb, Route } from './types/index.js';

export class RapidRouter {
  private routes: Route[] = [];
  private middlewares: Middleware[] = [];

  constructor() {}

  private addRoute(method: RequestVerb, url: string, handler: Function) {
    this.routes.push({ method, url, handler })
  }

  private findRoute(method: RequestVerb, url: string) {
    return this.routes.find(route => route.method === method && route.url === url);
  }

  public get(url: string, handler: Function) {
    this.addRoute(RequestVerb.GET, url, handler);
  }

  public use(handler: Function) {
    this.middlewares.push({ handler });
  }

  public listen(port: number, callback: () => void) {
    createServer((req, res) => {
      const method = req.method?.toUpperCase() as RequestVerb;
      const url = req.url?.toLowerCase() as string;
      const route = this.findRoute(method, url);
      this.middlewares.forEach(middleware => middleware.handler.apply(this, [req, res]));
      if (route) return route.handler.apply(this, [req, res]);
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found' }));
    }).listen(port, callback);
  }
}
