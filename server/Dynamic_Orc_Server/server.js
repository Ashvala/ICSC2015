var express = require('express');
var app = express();

//Express stuff for Origin headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
//Create Socket.io server
var io = require('socket.io').listen(8181);

//Output the current port

console.log("Listening on port: 8181");

io.on('connection', function (socket) {
    // Connect a client event
    console.log("Connected a client");
    console.log(socket.id);
    // Handle a note message
    socket.on("note_message", function (msg) {
	io.emit("note_message", msg);
	console.log(msg);
    });
    // Handle an orchestra message
    socket.on("orc", function (msg) {
	io.emit("orc", msg);
	console.log(msg);
	current_orc = msg;
    });
    // Handle a score message
    socket.on("sco", function (msg) {
	io.emit("sco", msg);
	console.log(msg);
    });

    // Handle a chanmsg
    socket.on("chanmsg", function (msg) {
	io.emit("chanmsg", msg);
	console.log(msg);
    });

    // Disconnect event
    socket.on("disconnect", function(){
	console.log("Disconnected a client")
    });
});
