var socket=io.connect('http://localhost:8010');

var message=document.getElementById('message');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var output=document.getElementById('output');

btn.addEventListener('click',{
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
        });
});