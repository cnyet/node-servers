const http = require('http');
const url = require('url');
const fs = require('fs');

// 创建服务器
http.createServer(function (request, response) {
  // 解析请求
  const pathname = url.parse(request.url).pathname;
  console.log('Request for' + pathname + ' received.');

  // 从问价系统读取文件内容
  fs.readFile(pathname.substr(1), function(err, data) {
    if (err) {
      console.log(err);
      response.writeHead(404, { 'Content-Type': 'text/html' });
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data.toString());
    }
    // 发送相应数据
    response.end();
  })
}).listen(3000);

console.log('Server running at http://localhost:3000');