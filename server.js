const http = require("http");
const fs = require("fs");
const server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("public/index.html").pipe(response);
});

server.listen(8080, function () {
  console.log("Server is running...");
});
