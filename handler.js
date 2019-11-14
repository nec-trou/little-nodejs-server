const fs = require('fs');
const qs = require('querystring');

function _handler(req, res) {
  const path = req.url.substr(1);
  if (path === 'favicon.ico') {
    res.writeHead(206, { 'Content-Type': 'image/x-icon' });
    res.end();
  }

  const targetPath = './template.html';
  const target = '{read-file}';
  const contentPath = `./dist/${path}`;

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const writeStream = fs.createWriteStream(contentPath);
      console.log(body);
      body = qs.parse(body);
      writeStream.write(body.content, 'utf8');
      writeStream
        .on('finish', () => {
          console.log('Data is written to the file!');
        })
        .close();
    });
  }
  fs.readFile(targetPath, (err, targetData) => {
    let content = '';
    const contentStream = fs.createReadStream(contentPath, 'utf8');

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    contentStream
      .on('data', chunk => {
        content += chunk;
      })
      .on('end', () => {
        targetData = targetData.toString().replace(target, content);
        res.end(targetData);
      })
      .on('error', err => {
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
