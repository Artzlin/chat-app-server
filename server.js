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

  socket.on("send",(msg)=>{
    console.log("SERVER: the message is: "+msg.text)

    socket.broadcast.emit("receive",msg)
});
})



app.get("/",(req,res)=>
{
  res.send("started the server")
})
