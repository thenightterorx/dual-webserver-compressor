const http = require("http");
const { exec } = require('node:child_process');
const execSync = require('child_process').execSync;
const fs = require('fs').promises;
const host = '0.0.0.0';
const port = 8000;
const shelljs = require('shelljs');

exec("mkdir /home/lee/hello");

const requestListener = function (req, res) {
  //res.writeHead(200);
  
  res.setHeader("Content-Type", "application/x-7z-compressed");
  console.log(req.url);
  rawanted=req.url;
  wanted=rawanted.slice(1);
  oldwanted=wanted;
  if (wanted.charAt(wanted.length-1)=="/"){
    wanted=wanted+"index.html"
  }
  try{
    //mkdirerr = execSync("mkdir /home/"+process.env.USER+"/servercache/"+wanted);
    //execSync("sed -i \'s/https:\/\//localhost:8000/g\' "+filePath)

    directory = "/home/"+process.env.USER+"/servercache/"+wanted;
    createcommand= ("mkdir -p \"$(dirname \"" + directory + "\")\" && touch \"" + directory + "\"");
    console.log(createcommand);
    execSync(createcommand);

  }catch(error){
    rmerr = execSync("rm -rf /home/"+process.env.USER+"/servercache/"+wanted);
    //rmerr = execSync("rm -rf /home/"+process.env.USER+"/servercache/"+)
    rmerr = execSync("rm -rf /home/"+process.env.USER+"/servercache/"+wanted+".7z");
  }

  //rmerr = execSync("rm -rf /home/+process.env.USER+"/servercache/"+wanted);
  //mkdirerr = execSync("mkdir /home/"+process.env.USER+"/servercache/"+wanted);
  
  try{
    wgeterr = execSync("wget -P /home/"+process.env.USER+"/servercache/"+wanted+" "+oldwanted);
  }catch(error){
    console.log("uhh no work");
  }

  var fixedwanted=wanted.replace("/","\\/")
  
  //this is a nightmare
  //execSync("sed -i \'s/https:\\/\\//localhost:8000/g\' "               +    "/home/"+process.env.USER+"/servercache/"+wanted);
  //execSync("sed -i \'s/href=\"\//localhost:8000\/"+fixedwanted+"/g\' "  +    "/home/"+process.env.USER+"/servercache/"+wanted);

  wantedlist=wanted.split("/");

  prevpath="";

  for(let i=0;i<wantedlist.length-1;i++){
    prevpath=prevpath+wantedlist[i]+"/"
  }

  try{
    shelljs.sed('-i', 'https://',"localhost:8002/", "/home/"+process.env.USER+"/servercache/"+wanted);
    shelljs.sed('-i', "href=\"","href=\"/"+prevpath, "/home/"+process.env.USER+"/servercache/"+wanted);
  }catch(e){
    console.log("/home/"+process.env.USER+"/servercache/"+wanted+" probably doesnt exist");
  }

  sziperror = execSync("7z a /home/"+process.env.USER+"/servercache/"+wanted+".7z /home/"+process.env.USER+"/servercache/"+wanted );
  filePath="/home/"+process.env.USER+"/servercache/"+wanted+".7z"
  console.log(filePath);
  /*
  fs.readFile(filePath, function(error, content) {
    console.log("A");
    res.writeHead(200, { 'Content-Type': "application/x-7z-compressed"});
    console.log(filePath);
    res.end(content, 'utf-8');
  })
  */
  //execSync("sed -i \'s/https:\\/\\//localhost:8000/g\' "+filePath);
  //execSync("sed -i \'href=\"\//localhost:8000/"+wanted+"/g\' "+filePath)

  fs.readFile(filePath).then(contents => {
    console.log("sending: "+filePath);
    res.setHeader("Content-Type", "application/x-7z-compressed");
    res.writeHead(200);
    res.end(contents);
  })

};



const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
