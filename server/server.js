var express = require("express");
var app = express(); 
var path = require("path");
var publicPath = path.join(__dirname, "../public");
console.log(publicPath);
app.use(express.static(publicPath));
app.get("/", (req, res)=>{
    res.sendFile("index.html");
});
app.listen(3000, ()=>{
    console.log("server connected");
})