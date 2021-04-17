var express=require('express');
var app=express();
var server=require('http').createServer(app);
var io=require('socket.io').listen(server);
users=[];
connections=[];

server.listen(process.env.PORT || 8010);
console.log('Listening at port 8010');

//app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection',(socket)=>
 {
   connections.push(socket);
   console.log('Connected: %s sockets connected',connections.length);
   socket.on('disconnect',function(data){
      users.splice(users.indexOf(socket.username),1);
      updateUsernames();
      connections.splice(connections.indexOf(socket),1);
      console.log('Disconnected: %s sockets connected', connections.length);
   });
   socket.on('send message',function(data){
     io.sockets.emit('new message',{msg: data,user: socket.username});
   });

   socket.on('new user',(data,callback)=>
    {
      //callback(true);
      socket.username=data;
      users.push(socket.username);
      updateUsernames();
    });

  socket.on('typing',(a)=>
   {
     var s=socket.username+" is typing....";
     io.sockets.emit('typing user',s);
   });

  const updateUsernames=()=>
   {
     io.sockets.emit('get users',users);
   }
 });

/*io.on('connection',(socket)=>
 {
  //socket.removeAllListeners();
   arr.push(socket.id);
   console.log("A user connected!");
   socket.on('chat message',(data)=>
    {
      console.log("Backend Socket!");
      //socket.broadcast.emit(data);
      io.emit('chat message',data);
    });
   socket.on('disconnect',()=>
    {
      arr.shift();
      //socket.removeAllListeners()
      console.log("User disconnected!");
    });
 });

http.listen(8010, function(){
  console.log('Listening on ' + 8010);
});*/

/*var io=socket(server);

io.on('connection',(socket)=>
 {
   //console.log("Namastey! "+socket.id);
   socket.on('chat',(data)=>
    {
      console.log(data);
    });
 });*/