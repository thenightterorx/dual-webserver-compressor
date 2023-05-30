const http = require("http");
const { exec } = require('node:child_process');
const execSync = require('child_process').execSync;
const fs = require('fs').promises;
const host = '0.0.0.0';
const port = 8002;

var serverip = "localhost:8000";

const requestListener = function (req, res) {
  //res.writeHead(200);
  
  
  console.log(req.url);

  rawanted=req.url;
  wanted=rawanted.slice(1);
  
  if(wanted.charAt(wanted.length-1)=="/"){
    wanted=wanted+"index.html";
  }

  
  

  try{
    //mkdirerr = execSync("mkdir /home/"+process.env.USER+"/localcache/"+arguments[0]);
    directory = "/home/"+process.env.USER+"/localcache/"+wanted;
    createcommand= ("mkdir -p \"$(dirname \"" + directory + "\")\" && touch \"" + directory + "\"");
    console.log(createcommand);
    execSync(createcommand);

  }catch(error){
    console.log("cant create directory");  
    
    
  }

  //rmerr = execSync("rm -rf /home/"+process.env.USER+"/localcache/"+wanted);
  //mkdirerr = execSync("mkdir /home/"+process.env.USER+"/localcache/"+wanted);
  
  console.log("checker a");

  try{
    console.log("checker b");
    filePath="/home/"+process.env.USER+"/localcache/"+wanted;
    var teststuff=execSync("cat "+filepath);
    fs.readFile(filePath).then(contents => {
      console.log("sending: "+filePath);
      
      res.writeHead(200);
      res.end(contents);
    })

  }catch(error){
    console.log("checker c");
    try{
      console.log("checker d");
      var command=("wget -O /home/"+process.env.USER+"/localcache/"+wanted+".7z "+serverip+"/"+wanted)
      console.log(command);
      wgeterr = execSync(command);
      
      decommand=("7z x /home/"+process.env.USER+"/localcache/"+wanted+".7z -o"+"/home/"+process.env.USER+"/servercache/"+wanted); 
      console.log(decommand);
      decompress=execSync(decommand);
      filePath="/home/"+process.env.USER+"/localcache/"+wanted;
      console.log(filePath);
      try{
        execSync("cat "+filepath);
      }catch (e){
        console.log("amogus"); 
        filePath="/home/"+process.env.USER+"/localcache/"+wanted;
        
        
       
      }
      fs.readFile(filePath).then(contents => {
      console.log("sending: "+filePath);
      
      res.writeHead(200);
      res.end(contents);
    })


    }catch(err){
      console.log("checker e");
      res.writeHead(404);
    }
  }
  //sziperror = execSync("7z a /home/"+process.env.USER+"/localcache/"+wanted+".7z /home/"+process.env.USER+"/localcache/"+wanted );
  //ilePath="/home/"+process.env.USER+"/localcache/"+wanted+".7z"
  //console.log(filePath);
  /*
  fs.readFile(filePath, function(error, content) {
    console.log("A");
    res.writeHead(200, { 'Content-Type': "application/x-7z-compressed"});
    console.log(filePath);
    res.end(content, 'utf-8');
  })
  */
    
  

};



const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
