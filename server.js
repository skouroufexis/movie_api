
const http = require('http');
const url = require('url');
const fs=require('fs');

//to hold path of the html file to be returned
let filePath="";
let logFile =__dirname+'/log.txt';

http.createServer(function(request,response){

  const address=request.url
  const data=url.parse(address,true);

  if(data.pathname.includes('documentation'))
    {
      filePath=__dirname+'/documentation.html'; 
    }
   else
    {
      filePath=__dirname+'/index.html';
    } 
  
    response.writeHead(200, {'Content-Type': 'text/html'});
    
   //reading the html file
   fs.readFile(filePath,function(error,content){
     if(error)
      { 
        response.end('Page not found!');
      }
      else
      {
        response.end(content);
        fs.appendFile(logFile,'visited '+ data.path + ' at '+ new Date() +'\n',function(error){
          if(error) throw error;
        })

      }
   }); 
  
}).listen(8080);


console.log('running');






















