//demo of promises in ES6
"use strict";

var http = require('http' );
var request = require('request');
var server = http.createServer();
var theurl = "http://www.google.com";

var promise = new Promise(function(resolve, reject) {

    //async call
    request( theurl , function (error, response, html) {
        if (!error && response.statusCode == 200) {
             resolve( html.substring(0,400) );
        }
        else{
            reject(error);
        }
    });
});

promise.then(
        function(result) {
            console.log('result: ', result); // "Stuff worked!"
        },
        function(err) {
            console.log('error: ', err ); // Error: "It broke"
        });

server.listen(8080, function() {
    console.log(' Listening on port 8080');
});