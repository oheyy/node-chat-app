var express = require("express");
var path = require("path");
var http = require("http");
var socketIO = require("socket.io");


var publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
var app = express(); 
app.use(express.static(publicPath));

var {generateMessage} = require("./utils/message");
var server = http.createServer(app);
var io = socketIO(server);
var clients = 0;
io.on("connection", function(socket){
    //clients++;
    console.log("Client connected");
    socket.on("join", function(data){
        console.log(data);

    socket.on("createMessage", (data)=>{
            console.log(data);
            io.emit("newMessage", generateMessage(data.from, data.text));
        });

        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"));
        //Broadcast to all except sender
        socket.broadcast.emit("newMessage", generateMessage("Admin", "New User Joined!"));

        socket.on("chat-message", function(data){
            console.log("message:" + data);
        })
    })
});

server.listen(port, ()=>{
    console.log("server connected");
});

module.exports = {server};