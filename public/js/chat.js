var socket = io();
function scrollToBottom(){
    var messages = $("#messages");
    var newMessage = messages.children("li:last-child");

    //Height of scrollbar
    var clientHeight = messages.prop("clientHeight");
    //scroll top is the length scrolled down to top of scrollbar
    var scrollTop = messages.prop("scrollTop");
    //entire height of messages
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    console.log("newMessageHeight: "+ newMessageHeight);
    console.log(lastMessageHeight);
    console.log(clientHeight, scrollTop, scrollHeight);

    if(clientHeight + scrollTop + newMessageHeight  >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}
socket.on("connect", function(){
    var params = $.deparam(window.location.search);
    socket.emit("join", params, function(err){
        if(err){
            alert(err);
            window.location.href = "/";
        }else{
            console.log("success");
        }
    })
});

socket.on("disconnect", function(){
    console.log("Disconnected from server");
});

socket.on("updateUserList", function(usersArray){
    var ul = $("<ul></ul>");
    usersArray.forEach(function(user){
        ul.append($("<li></li>").text(user));
    });
    //.html completely replaces the content instead of appending it
    $("#users").html(ul);

});

socket.on("newMessage", function(message){
    var formattedTime = moment(message.createdAt).format("hh:mm a");
    var template = $("#message-template").html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime, 
        text: message.text 
    });

    $("#messages").append(html);
    scrollToBottom();
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
    scrollToBottom();  
});

$("form").submit(function(event){
    event.preventDefault();
    var params = $.deparam(window.location.search);
    var messageTextBox = $("#chat-message");
    socket.emit("createMessage", {
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
            lat, 
            long
        });
        sendLocButton.removeAttr("disabled").text("Sending location");
    }, function(){
            sendLocButton.removeAttr("disabled").text("Sending location");
            alert( "Unable to retrieve your location"); 
    });

});
