import { createServer, Request, Response, Next } from 'restify';

function respond(req: Request, res: Response, next: Next) {
    res.send('hello ' + req.params.name);
    next();
}

export function start() {
    var server = createServer();
    server.get('/hello/:name', respond);
    server.head('/hello/:name', respond);

    server.listen(8080, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
}