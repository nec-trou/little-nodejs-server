const http = require('http');
const settings = require('./handler.js');

http.createServer(settings.handler).listen(settings.port);