const fs = require("fs");

function _handler(req, res) {
  const path = req.url.substr(1);

  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(500);
      console.log(err);
      res.end(`Sorry, it's nothing here. Please, try other path.`);
      return;
    }
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });
    res.end(data);
  });
}

module.exports = {
  handler: _handler,
  port: 8080
};
