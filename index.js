require('./queue/mainQueues');


const http = require('http');


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, world!\n');
    }

});


const PORT = 3000;

server.listen(PORT, () => {

    console.log(`Server listening on port ${PORT}`);

});