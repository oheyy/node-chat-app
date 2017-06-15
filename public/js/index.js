var socket = io();
socket.on("connect", function(){
    console.log("Connected to server");
});

socket.on("disconnect", function(){
    console.log("Disconnected from server");
})
socket.on("newMessage", function(message){
    var formattedTime = moment(message.createdAt).format("hh:mm a");
    var template = $("#message-template").html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime, 
        text: message.text 
    });

    $("#messages").append(html);
    
    // var li = $("<li></li>");
    // li.text(message.from + ": "+ message.text + " " + formattedTime);
    // $("#messages").append(li);
});
socket.on("newLocationMessage", function(message){
    var formattedTime = moment(message.createdAt).format("hh:mm a");
    var template = $("#location-message-template").html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime, 
        url: message.url
    });
    $("#messages").append(html);    
});

$("form").submit(function(event){
    event.preventDefault();
    var messageTextBox = $("#chat-message");
    socket.emit("createMessage", {
        from: "User", 
        text: messageTextBox.val()  
    }, function(){
        messageTextBox.val(" "); 
    })
});

$("#send-location").on("click", function(){
    var sendLocButton = $(this);
    var result = $("#geoLocation");
    if(!navigator.geolocation){
        result.html = "<p>Geolocation is not supported by your browser</p>";
        return;
    }
    
   sendLocButton.attr("disabled", "disabled").text("Sending location....");

    navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        socket.emit("createLocationMessage", {
            from: "User",
            lat, 
            long
        });
        sendLocButton.removeAttr("disabled").text("Sending location");
    }, function(){
            sendLocButton.removeAttr("disabled").text("Sending location");
            alert( "Unable to retrieve your location"); 
    });
//     function success(position){
//         var lat = position.coords.latitude;
//         var long = position.coords.longitude;
//         socket.emit("createLocationMessage", {
//             from: "User",
//             lat, 
//             long
//         });
//         sendLocButton.removeAttr("disabled").text("Sending location");
//     }
//     function error(){
//         sendLocButton.removeAttr("disabled").text("Sending location");
//         alert( "Unable to retrieve your location");
//     }

//     result.html = "<p>Locating..</p>"


});
