var socket = io();
socket.emit("join", "Hello I am from client!");
socket.emit("createEmail", "example@example.com");
socket.on("newEmail", function(data){
    console.log("New Email");
    console.log(data.from, data.text);
});

socket.on("newMessage", function(data){
    console.log(data);
});

socket.emit("createMessage", {
    from: "client@example.com",
    text:"text from client"
});
$(function(){
    $("form").submit(function(event){
        event.preventDefault();
        var message = $("#chat-message").val(); 
        socket.emit("chat-message", message);
        $("#chat-message").val(" ");
    });
});
