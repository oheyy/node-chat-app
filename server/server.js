var express = require("express");
var path = require("path");
var http = require("http");
var socketIO = require("socket.io");


var publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
var app = express(); 
app.use(express.static(publicPath));

var {generateMessage, generateLocationMessage} = require("./utils/message");
var server = http.createServer(app);
var io = socketIO(server);
var clients = 0;
io.on("connection", function(socket){
    //clients++;
    console.log("Client connected");
    socket.on("connect", ()=>{
        console.log("User connected");
    });
    socket.on("disconnect", ()=>{
        console.log("User disconnected")
    });

    socket.on("createMessage", (data, callback)=>{
            console.log(data);
            io.emit("newMessage", generateMessage(data.from, data.text));
            callback();
        });
    
    socket.on("createLocationMessage", (message)=>{
        //var text = "Latitude: "+ coords.lat + ", Longitude: " + coords.long;
        io.emit("newLocationMessage",generateLocationMessage(message.from, message.lat, message.long));
    });

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"));
    //Broadcast to all except sender
    socket.broadcast.emit("newMessage", generateMessage("Admin", "New User Joined!"));

    })

server.listen(port, ()=>{
    console.log("server connected");
});

module.exports = {server};