const http = require("http");
const { exec } = require('node:child_process');
const fs = require('fs').promises;
const host = '0.0.0.0';
const port = 8000;

exec("mkdir /home/lee/hello");

const requestListener = function (req, res) {
  //res.writeHead(200);
  
  res.setHeader("Content-Type", "application/x-7z-compressed");
  console.log(req.url);
  exec("mkdir /home/"+process.env.USER+"/servercache/"+req.url);
  exec("wget -P /home/lee/servercache/"+req.url+" "+req.url);
  exec("7z a /home/"+process.env.USER+"/servercache/"+req.url+".7z /home/"+process.env.USER+"/servercache/"+req.url );

  fs.readFile(filePath, function(error, content) {
    response.writeHead(200, { 'Content-Type': "application/x-7z-compressed"});
    response.end(content, 'utf-8');
  }

};



const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
