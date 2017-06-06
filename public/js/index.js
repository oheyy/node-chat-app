var socket = io();
socket.emit("join", "Connected");

socket.emit("createMessage", {
    from: "client@example.com",
    text:"text from client"
});

socket.on("newMessage", function(data){
    console.log(data.text);
});

$(function(){
    $("form").submit(function(event){
        event.preventDefault();
        var message = $("#chat-message").val(); 
        socket.emit("chat-message", message);
        $("#chat-message").val(" ");
    });
});
