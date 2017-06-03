var express = require("express");
var app = express(); 
var path = require("path");
var publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
console.log(publicPath);
app.use(express.static(publicPath));
// app.get("/", (req, res)=>{
//     res.sendFile("index.html");
// });
app.listen(port, ()=>{
    console.log("server connected");
});