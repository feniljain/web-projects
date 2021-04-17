(function(){
    var video=document.getElementById('video'),
        vendorUrl=window.URL || window.webKitURL;

        navigator.getMedia=navigator.getUserMedia ||
                           navigator.webkitGetUserMedia||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia;
        
        navigator.getMedia({
            video: true,
            audio: false
        }, function(stream){
            video.srcObject=stream;
            video.play();
            socket.emit('send', "something");
        }, function(error){

        });
})();//Self Invoking Element