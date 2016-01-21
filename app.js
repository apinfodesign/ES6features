// Program to evaluate how much a web site has changed over a time period.
// Uses "natural", an npm language processing module.
// Also provides demo of various ES6 syntax features -

"use strict";

var http    = require('http' );
var request = require('request');  //simplest http server
var natural = require('natural');
var server  = http.createServer();

///runtime testing variables
var theurl      = "http://apinfodesign.com"; // web site for testing
var theurlHTML  = "<!DOCTYPE";  //simulates snapshot string from web site at T - X hours
const hours     = 3; //testing value for hours between measurements

//Reporting module, using ES6 templates
var howDifferentDice = (HTMLtime1, HTMLtime2) => {
    console.log('Dice differenceFinder');
    console.log(`time 1: ${HTMLtime1}`);
    console.log(`time 2: ${HTMLtime2}`);
    console.log(`Dice Coefficient:  ${ natural.DiceCoefficient( HTMLtime1, HTMLtime2) } `);
    console.log();
}
var howDifferentJW = (HTMLtime1, HTMLtime2) => {
    console.log('JaroWinkler differenceFinder');
    console.log(`time 1: ${HTMLtime1}`);    //example of template strings, here and below
    console.log(`time 2: ${HTMLtime2}`);
    console.log(`JaroWinkler Distance: ${natural.JaroWinklerDistance( HTMLtime1, HTMLtime2) }`);
}

//Example of ES6 class
class differenceFinder {
    constructor(HTMLtime1, HTMLtime2) {
        this.first = HTMLtime1;
        this.second = HTMLtime2;
    }
    //define method
    jarowinkler() {
        howDifferentJW(this.first, this.second);
    }
    //define method
    dice() {
        howDifferentDice(this.first, this.second);
    }
}


//example of ES6 class inheritance
var measureFrequencySymbol = Symbol();
class timeStamper extends differenceFinder {

    constructor(HTMLtime1, HTMLtime2) {
        super(HTMLtime1, HTMLtime2);      ///call constructor above
        this[measureFrequencySymbol] = 0;
    }

    get measureFrequecy() {
        return this[measureFrequencySymbol];
    }

    set measureFrequency(value) {
        if ( Number.isNaN(value) ) {
            console.log("measureFrequency must be greater than zero.");
        }
        this[measureFrequencySymbol] = value;
    }

    dice() {
        console.log(`This will be measured every ${this[measureFrequencySymbol]}  hours.`);
        console.log();
        super.dice();
    }

    jarowinkler() {
        console.log(`This will be measured every ${this[measureFrequencySymbol]}  hours.`);
        console.log();
        super.jarowinkler();
    }
}

//define promise
var promise = new Promise(function(resolve, reject) {
    //async call
    request( theurl, function (error, response, html) {
        if (!error && response.statusCode == 200) {
             resolve( html.substring(0,14) );
        }
        else{
            reject(error);
        }
    });
});

//execute promise?, then report results
promise.then(
        function (result) {
            console.log();
            console.log('successful remote file read >>>> : ', result);
            console.log();


            //demo of call to class
            //var df = new differenceFinder( theurlHTML, result );
            //df.dice();
            //df.jarowinkler();

            //demo of call to inherited class
            var ts = new timeStamper( theurlHTML, result);
            ts.measureFrequency = hours;   //assign measure frequency in hours
            ts.dice();
            ts.jarowinkler();

        },
        function (err) {
            console.log('error while trying to read remote file: ', err);
        });


server.listen(process.env.PORT || 3000, function () {
    console.log(' Listening on port 3000');
});