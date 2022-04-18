import { createServer, Request, Response, Next } from 'restify';
import cors from 'cors';

function respond(req: Request, res: Response, next: Next) {
    if (req.params.name) {
        res.send('hello ' + req.params.name);
    } else {
        res.send({"id": "hello there"});
    }
    next();
}

export function start() {
    var server = createServer();
    server.get('/hello', respond);
    server.head('/hello', respond);
    server.get('/hello/:name', respond);
    server.head('/hello/:name', respond);

    // server.use(cors({
    //     origin: "*",
    //     methods: 'GET,PUT,POST,DELETE',
    //     allowedHeaders: ['Content-Type', 'api_key', 'Authorization']
    // }));

    server.pre((req: Request, res: Response, next: Next)=> {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        res.header("Access-Control-Allow-Headers", "Content-Type, api_key, Authorization")
        next();
    });

    server.listen(8080, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
}