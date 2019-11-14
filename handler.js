const fs = require('fs');

function _handler(req, res) {
  const path = req.url.substr(1);
  if (path === 'favicon.ico') {
    res.writeHead(206, { 'Content-Type': 'image/x-icon' });
    res.end();
  }
  const targetPath = './template.html';
  const target = '{read-file}';
  const contentPath = `./dist/${path}`;

  fs.readFile(targetPath, (err, targetData) => {
    let content = '';
    const contentStream = fs.createReadStream(contentPath, 'utf8');

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    contentStream
      .on('data', function(chunk) {
        content += chunk;
      })
      .on('end', function() {
        targetData = targetData.toString().replace(target, content);
        res.end(targetData);
      })
      .on('error', function(err) {
        res.writeHead(500);
        res.end(`Sorry, it's nothing here. Please, try other path.`);
        console.log(`Not found ${err}`);
      });
  });
}

module.exports = {
  handler: _handler,
  port: 8080
};