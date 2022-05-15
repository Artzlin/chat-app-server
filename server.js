var io = require('socket.io')(8321,{cors:{
    origin:['http://localhost:5500']
}});


console.log("running on 'http://localhost:8321'");

io.on('connection', function(socket) {
  
  console.log(socket.id);

  socket.on("send",(msg)=>{
    console.log("SERVER: the message is: "+msg.text)

    socket.broadcast.emit("receive",msg)
});
})




