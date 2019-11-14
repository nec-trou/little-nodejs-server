const fs = require('fs');

function _handler(req, res) {
  fs.readFile('./doc.txt', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(err);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(`<h3>Hello cruel world!</h3> \n ${req.url} \n ${data}`);
  });
}

module.exports = {
  handler: _handler,
  port: 8080
};
