
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
// index.js
const cron = require("node-cron");
const express = require("express");
const fs = require("fs");

app = express();

// schedule tasks to be run on the server
// cron.schedule("* * * * *", function () {
//     console.log("---------------------");
//     console.log("Running Cron Job");
//     fs.unlink("./error.log", err => {
//         if (err) throw err;
//         console.log("Error file succesfully deleted");
//     });
// });

cron.schedule("* * * * *", function () {
    console.log("running a task every minute");
});

app.listen("3128");
