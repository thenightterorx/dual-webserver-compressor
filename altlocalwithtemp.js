const http = require("http");
const { exec } = require('node:child_process');
const execSync = require('child_process').execSync;
const fs = require('fs').promises;
const host = '0.0.0.0';
const port = 8002;
const shelljs = require('shelljs');

var serverip = "localhost:8000";

const requestListener = function (req, res) {
  //res.writeHead(200);
  console.log("connection to local server got!"); 
  
  console.log(req.url);

  rawanted=req.url;
  wanted=rawanted.slice(1);
  oldwanted=rawanted.slice(1);
  
  if(wanted.charAt(wanted.length-1)=="/"){
    wanted=wanted+"index.html";
  }

  wantedlist=wanted.split("/");
  
/*
  try{
    //mkdirerr = execSync("mkdir /home/"+process.env.USER+"/localcache/"+arguments[0]);
    directory = "/home/"+process.env.USER+"/localcache/"+wanted;
    createcommand= ("mkdir -p \"$(dirname \"" + directory + "\")\" && touch \"" + directory + "\"");
    console.log(createcommand);
    execSync(createcommand);

  }catch(error){
    console.log("cant create directory");  
    
    
  }
*/
  //rmerr = execSync("rm -rf /home/"+process.env.USER+"/localcache/"+wanted);
  //mkdirerr = execSync("mkdir /home/"+process.env.USER+"/localcache/"+wanted);
  
  console.log("checker a");

  try{
    console.log("checker b");
    filePath="/home/"+process.env.USER+"/localcache/"+wanted;
    console.log(filePath);
    var teststuff=execSync("cat "+filePath+ " > /dev/null");

    fs.readFile(filePath).then(contents => {
      console.log("sending: "+filePath);
      
      res.writeHead(200);
      res.end(contents);
    })

  }catch(error){
    
try{
    //mkdirerr = execSync("mkdir /home/"+process.env.USER+"/localcache/"+arguments[0]);
    directory = "/home/"+process.env.USER+"/localcache/"+wanted;
    createcommand= ("mkdir -p \"$(dirname \"" + directory + "\")\" && touch \"" + directory + "\"");
    console.log(createcommand);
    execSync(createcommand);

  }catch(error){
    console.log("cant create directory");  
    
    
  }

    console.log("checker c");
    try{
      console.log("checker d");
      var command=("wget -O /home/"+process.env.USER+"/localcache/"+wanted+".7z "+serverip+"/"+oldwanted);
      console.log(command);
      wgeterr = execSync(command);
      
      console.log("checker x");

      decommand=("7z x /home/"+process.env.USER+"/localcache/"+wanted+".7z -o"+"/home/"+process.env.USER+"/localtemp/"+wanted); 
      console.log(decommand);
      decompress=execSync(decommand);

      //move from temp folder to cache
      movecommand=shelljs.mv("/home/"+process.env.USER+"/localtemp/"+wanted+'/'+wantedlist[wantedlist.length-1], "/home/"+process.env.USER+"/localcache/"+wanted);
      console.log("movecommand error: "+movecommand);
      console.log("checker y");
      filePath="/home/"+process.env.USER+"/localcache/"+wanted;
      
prevpath="";

  for(let i=0;i<wantedlist.length-1;i++){
    prevpath=prevpath+wantedlist[i]+"/"
  }
      
      try{
        console.log("trying to fix the / for the second time geez");
        //secondreplace=shelljs.sed('-i', 'href="','href='+prevpath, filePath);
      }catch(sus){
        console.log(secondreplace);
      }
      console.log("the program progressed after / replacement");
      //console.log(secondreplace);
      console.log(filePath);

      try{
        console.log("Trying to cat the file to see if it actually exists lol");
        //caterror=execSync("cat "+filePath);
      }catch (e){
        console.log("amogus"); 
        filePath="/home/"+process.env.USER+"/localcache/"+wanted;
        
        
       
      }
      try{
      console.log("woohoo trying to send full send it yeah (I am not affiliated)");
      fs.readFile(filePath).then(contents => {
      console.log("sending: "+filePath);
      
      res.writeHead(200);
      res.end(contents);
      console.log("checker z");
    })
      }catch(thingbad){
        console.log("cant send very bad");
        res.writeHead(404);
        res.end("Resource not found");
      }


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
