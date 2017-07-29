// var http = require("http"),
//   https = require("https"),
//   fs = require("fs"),express = require("express"),
//   methods = Object.create(null);
//   var options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
//   };

var fs = require('fs');
var https = require('https');
var app = require('express')();
var methods = Object.create(null);
var options = {
   key  : fs.readFileSync('server.key'),
   cert : fs.readFileSync('server.crt')
};

app.get('/', function (req, res) {
   res.send('Hello World!');
});

// https.createServer(options, app).listen(3000, function () {
//    console.log('Started https!');
// });

    // https.createServer(options, function (req, res) {
    //   res.writeHead(200);
    //   res.end("hello world\n");
    //   console.log('running');
    // }).listen(8000);

//
https.createServer(options, function(request, response) {
  /*Looks for the index.html file; if it finds it
  thats what it shows if the request url ends with
  a slash*/

  function respond(code, body, type) {
    if (!type) type = "text/plain";
    response.writeHead(code, {"Content-Type": type});
    if (body && body.pipe)
      body.pipe(response);
    else
      response.end(body);
  }

  if (request.method in methods)
  {
    methods[request.method](urlToPath(request.url),
                            respond, request);
  }
  else
    respond(405, "Method " + request.method +
            " not allowed.");
}).listen(8082, function() {
    console.log('listening on 8082')
});






function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  var decoded = decodeURIComponent(path);
  return "." + decoded.replace(/(\/|\\)\.\.(\/|\\|$)/g, "/");
}
methods.POST = function(path, response, request){
  console.log("POSTING");
  var body = '';
  request.on('data', function (data) {
      body+=decodeURIComponent(data);
      //console.log("Partial body: " + body);

  });

  request.on('end', function () {
      response(200, body, 'text/json');
  });
}
methods.GET = function(path, respond) {
  var index = path.split('/').length-1;
  var new_path = path.split('/');
  console.log(Object.prototype.pop);
  newer_path=[];
  console.log(typeof(newer_path));
  newer_path=new_path.pop();

  console.log(newer_path)
  //console.log(index)
  fs.stat(path, function(error, stats) {
    var indexStr='';
    if (error && error.code == "ENOENT")
      respond(404, "File not found");
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      fs.readdir(path, function(error, files) {
        if (error)
          respond(500, error.toString());
        else{
          files.forEach(function(item){
            console.log(item)
            console.log(path.split('/'))
             indexStr+= '<a href="'+item+'">'+item+'</a><br>';
          })
            respond(200, indexStr, 'text/html');
           }
      });
    else
      respond(200, fs.createReadStream(path),
              require("mime").lookup(path));
  });
};

methods.DELETE = function(path, respond) {
  fs.stat(path, function(error, stats) {
    if (error && error.code == "ENOENT")
      respond(204);
    else if (error)
      respond(500, error.toString());
    else if (stats.isDirectory())
      fs.rmdir(path, respondErrorOrNothing(respond));
    else
      fs.unlink(path, respondErrorOrNothing(respond));
  });
};
//
// function respondErrorOrNothing(respond) {
//   return function(error) {
//     if (error)
//       respond(500, error.toString());
//     else
//       respond(204);
//   };
// }
//
// methods.PUT = function(path, respond, request) {
//   var outStream = fs.createWriteStream(path);
//   outStream.on("error", function(error) {
//     respond(500, error.toString());
//   });
//   outStream.on("finish", function() {
//     respond(204);
//   });
//   request.pipe(outStream);
// };
