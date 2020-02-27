const http = require('http');
const fs = require('fs');
let number = 1;
function wait(seconds) {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('success');
    }, seconds * 1000);
  }); 
}

http.createServer(function(request, response){
  console.log(request.headers.host, request.url);
  if (request.url === '/') {
    const html = fs.readFileSync('index.html', 'utf8');
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.end(html);
  }
  if (request.url === '/data') {
    response.writeHead(200, {
      // 'Cache-Control': 'max-age=100',
      // 'X-Test-Cache': number++
    });
    // response.end('success');
    wait(2).then(function(res){
      response.end(res);
    });
  }
}).listen(8888);

console.log('server start 8888');

