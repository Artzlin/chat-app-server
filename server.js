const express=require("express");
const app= express();

let port=process.env.PORT || 8321


const server=app.listen(port)

var io = require('socket.io')(server,{cors:{
    origin:"*",
    methods: ["GET", "POST"]
}});


console.log("running on 'http://localhost:8321'");

io.on('connection', function(socket) {
  
  console.log(socket.id);

  //send vibr handling
  socket.on("send",(msg)=>{
    console.log("SERVER: the message is: "+msg.text)

    socket.broadcast.emit("receive",msg)
})
//stop events handling
  socket.on("send-stop",()=>{
    console.log("stopping is requested")

    socket.broadcast.emit("receive-stop")
});


//send vibr handling
  socket.on("send-long",()=>{
    socket.broadcast.emit("receive-long")
})
//stop events handling
  socket.on("send-long-stop",()=>{
    socket.broadcast.emit("receive-long-stop")
});



});





app.get("/",(req,res)=>
{
  res.send("started the server")
})
