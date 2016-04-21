
var http = require("http");
var cluster = require('cluster');
var fs = require('fs');

function handleIncomingRequest(req,res){
    console.log("INCOMING REQUEST: " + req.method + " " + req.url);
    var jsonBody = "";

    var currentRequest;
    if(cluster.isMaster) {

        if(req.method.toUpperCase() == "POST")
        {
            req.on("data",function(data){
                //console.log("handle request");
                currentRequest = data.toString('utf8');


                    var worker = cluster.fork();
                    cluster.on("fork",function(worker){

                        fs.open('input.txt', 'r+', function(err, fd) {
                            if (err) {
                                fs.writeFile("input.txt",currentRequest);
                                return console.error(err);
                            }
                            else
                            {
                                fs.appendFile("input.txt",currentRequest);
                                console.log("File opened successfully!");
                            }

                        });

                        console.log("process forked");
                        worker.kill();
                      //  console.log(currentRequest);

                    });
                    cluster.on('exit', function(worker, code, signal) {
                        console.log('worker'+ worker.process.pid +'died');
                        requestEnd(res,currentRequest);
                });


            })
        }

    }





}

function requestEnd(res,response){

    //res.setEncoding('utf8');
    res.writeHead(200, { "Content-Type" : "application/json" });
    res.end(response);

}





var server = http.createServer(handleIncomingRequest);
server.listen(8080);
