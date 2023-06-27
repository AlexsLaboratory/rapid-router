export enum RequestVerb {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}
export interface Route {
    method: RequestVerb,
    url: string,
    handler: Function
}
export interface Middleware {
    handler: Function
}
