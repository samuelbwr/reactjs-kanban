var http = require('http');
var express = require('express');
var path = require('path');


var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 8000, process.env.IP || "127.0.0.1", function(){
  var addr = server.address();
  console.log("Server up and running on", addr.address + ":" + addr.port);
});
