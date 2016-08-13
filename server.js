var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var port = process.env.PORT || 8080;
var async = require("async");

app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');


var stocks= [];

app.get("/", function(req, res){
  res.render("index.ejs");
});


io.on('connection', function (socket) {
  console.log(stocks);
  io.emit("load", stocks);
  
  socket.on("new", function(search){
    if (stocks.indexOf(search) > -1) {
      return;
    } else {
      stocks.push(search);
      io.emit("load", stocks);
      console.log(stocks);
    }
  });});    

http.listen(port);
console.log("Listening on port " + port);

