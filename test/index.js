const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer(function(request, response) {
  console.log('request: ', request.headers.host);
  if (request.url === '/') {
    const html = fs.readFileSync('index.html', 'utf8');
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Security-Policy': 'default-src http: https:'
    });
    response.end(html);
  }
  // if (request.url === '/') {
  //   response.writeHead(302, {
  //     'Location': '/new'
  //   });
  //   response.end('');
  // } 
  // if (request.url === '/new') {
  //   response.writeHead(200, {
  //     'Content-Type': 'text/html',
  //   })
  //   response.end('<h1>http</h1>');
  // } 

  // if (request.url === '/') {
  //   const html = fs.readFileSync('index.html');
  //   response.writeHead(200, {
  //     'Content-Type': 'text/html',
  //     'Content-Encoding': 'gzip'
  //     // 'Set-Cookie': ['id=123; max-age=10; httponly;', 'name=hello;domain=test.com;']
  //   });
  //   response.end(zlib.gzipSync(html));
  // } else {
  //   const image = fs.readFileSync('kobe.png');
  //   response.writeHead(200, {
  //     'Content-Type': 'image/png'
  //   });
  //   response.end(image);
  // }

  // if (request.url === '/cache') {
  //   const etag = request.headers['if-none-match'];
  //   if (etag === '123') {
  //     response.writeHead(304, {
  //       'Content-Type': 'text/html',
  //       'Cache-Control': 'max-age=1000, no-cache',
  //       'Last-Modified': '2020-02-15',
  //       'Etag': '123'
  //     });
  //     response.end('cache information.');
  //   } else {
  //     response.writeHead(200, {
  //       'Content-Type': 'text/html',
  //       'Cache-Control': 'max-age=1000, no-cache',
  //       'Last-Modified': '2020-02-15',
  //       'Etag': '1234'
  //     });
  //     response.end('last information.');
  //   }
  // }
}).listen(8888);

console.log('server start');