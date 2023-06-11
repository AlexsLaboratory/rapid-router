import { IncomingMessage, ServerResponse } from 'node:http';
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

  public get(url: string, handler: Function) {
    this.addRoute(RequestVerb.GET, url, handler);
    log(this.routes);
    this.routes[0].handler.apply(this, [this.req, this.res]);
    this.res.writeHead(200, { 'Content-Type': 'application/json' });
    this.res.end(JSON.stringify({ data: 'hello world' }));
  }
}