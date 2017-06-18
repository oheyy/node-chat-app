var express = require("express");
var path = require("path");
var http = require("http");
var socketIO = require("socket.io");


var publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
var app = express(); 
app.use(express.static(publicPath));

var id;
var {Users} = require("./utils/users");
var {generateMessage, generateLocationMessage} = require("./utils/message");
var {isRealString} = require("./utils/validation");
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();
io.on("connection", function(socket){
    socket.on("connect", ()=>{
        console.log("User connected");
    });


    socket.on("createMessage", (data, callback)=>{
            io.emit("newMessage", generateMessage(data.from, data.text));
            callback();
    });
    
    socket.on("createLocationMessage", (message)=>{
        //var text = "Latitude: "+ coords.lat + ", Longitude: " + coords.long;
        io.emit("newLocationMessage",generateLocationMessage(message.from, message.lat, message.long));
    });

    socket.on("join", (params, callback)=>{
        if(!isRealString(params.name)||!isRealString(params.room)){
            return callback("Name and room is requred!");
        }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        //Sends to everyone
        io.to(params.room).emit("updateUserList", users.getUserList(params.room));
        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"));
        //Broadcast to all except sender
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", params.name +"has joined"));

        callback();
        
    });

    socket.on("disconnect", ()=>{
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", user.name+" has left the room!"));
        }
        
    });
   
    })

server.listen(port, ()=>{
    console.log("server connected");
});

module.exports = {server};