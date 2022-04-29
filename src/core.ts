import { createServer, Request, Response, Next } from 'restify';

function respond(req: Request, res: Response, next: Next) {
    if (req.params.name) {
        let testData = { 'name': req.params.name }
        res.send(testData)
    } else {
        let testData = { 'name': 'hello' }
        res.send(testData)
    }
    next();
}

function getDetailedData(req: Request, res: Response, next: Next) {
    let testData = { 'name': 'get' };
    res.send(testData);
}

export function start() {
    var server = createServer();
    server.get('/hello', respond);
    server.head('/hello', respond);
    server.get('/hello/:name', respond);
    server.head('/hello/:name', respond);
    server.get('/details', getDetailedData);

    server.pre((req: Request, res: Response, next: Next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        res.header("Access-Control-Allow-Headers", "Content-Type, api_key, Authorization")
        next();
    });

    server.listen(8080, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
}