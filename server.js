
// var static = require('node-static');

// //
// // Create a node-static server instance to serve the './public' folder
// //
// var file = new static.Server('index.html');

// require('http').createServer(function (request, response) {
//     request.addListener('end', function () {
//         file.serve(request, response);
//     }).resume();
// }).listen(8080);

// 7368

var http = require('http');

http.createServer(onRequest).listen(8081);

function onRequest(client_req, client_res) {
    console.log('serve: ' + client_req.url);

    var options = {
        hostname: 'www.google.com',
        port: 80,
        path: client_req.url,
        method: 'GET'
    };

    var proxy = http.request(options, function (res) {
        res.pipe(client_res, {
            end: true
        });
    });

    client_req.pipe(proxy, {
        end: true
    });
}