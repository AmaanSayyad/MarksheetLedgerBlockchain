var http = require('http')
var contractConnection = require("./contractConnection")

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  contractConnection();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



