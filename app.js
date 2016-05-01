var net = require('net');
var activeClients = [];
//Create a socket connection.
var server = net.createServer(function(socket) {
    socket = socket.ref();
    activeClients.push(socket);
    socket.allowHalfOpen = true;
    //handle error so that other request listening to this request do not break
    socket.on("error",function(obj){
        console.log("On error");


    });
    socket.on('data',function(data){
        var message = "Data over socket:"+data
        console.log(message);
        //socket.write("Input from socket:"+data);
        broadcast(socket,message)
        //socket.wri
    })

    socket.write('Echo socket connected\r\n');




    function broadcast(sender,message){

        activeClients.forEach(function(client){
            if(sender !== client){
                client.write(message);
            }
        })
    }
    //socket.pipe(socket);
});

server.listen(8000, '127.0.0.1');