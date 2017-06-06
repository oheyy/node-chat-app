var express = require("express");
var path = require("path");
var http = require("http");
var socketIO = require("socket.io");

var publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
var app = express(); 
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on("connection", function(socket){
    console.log("Client connected");
    socket.on("join", function(data){
        console.log(data);
    })
    socket.emit("newEmail", {
        from: "daniel@example.com",
        text: "Stuff blah blah"
    });

    socket.emit("newMessage", {
        from:"example@example.com",
        text: "dsaasdasdasdasdasdasdadsa stuff",
        createdAt: new Date()
    });

    socket.on("createMessage", (data)=>{
        console.log(data);
        io.emit("newMessage", {
            from:data.from,
            text: data.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on("createEmail", (newEmail)=>{
        console.log(newEmail);
    });
    socket.on("chat-message", function(data){
        console.log("message:" + data);
    })
});



server.listen(port, ()=>{
    console.log("server connected");
});