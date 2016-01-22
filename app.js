// Program to evaluate how much a web site has changed over a time period.
// Uses "natural", an npm language processing module.
// Also provides demo of various ES6 syntax features -

"use strict";

function app( theurl, theurlHTML, hours ){

    var http    = require('http' );
    var request = require('request');  //simplest http server
    var natural = require('natural');
    var server  = http.createServer();

    //Example of ES6 class
    class DifferenceFinder {
        constructor(HTMLtime1 = '', HTMLtime2 = '') {
            this.first = HTMLtime1;
            this.second = HTMLtime2;
        }
        jarowinkler() {
            return natural.JaroWinklerDistance( this.first, this.second);
        }
        dice() {
            return natural.DiceCoefficient( this.first, this.second);
        }
    }

    //example of ES6 class inheritance
    var measureFrequencySymbol = Symbol();
    class TimeStamper extends DifferenceFinder {

        constructor(HTMLtime1, HTMLtime2, hours = 0) {
            super(HTMLtime1, HTMLtime2);      ///call constructor above
            this[measureFrequencySymbol] = hours;
        }

        get measureFrequecy() {
            return this[measureFrequencySymbol];
        }

        set measureFrequency(value) {
            if ( Number.isNaN(value) ) {
                return {error: 'measureFrequency must be greater than zero.'};
            }
            this[measureFrequencySymbol] = value;
        }

        dice() {
            console.log(`Frequency of Measure: ${this[measureFrequencySymbol]} hours.`);
            const result = { diffMeasure: super.dice() };
            result.hours = this[measureFrequencySymbol];
            return result;
        }

        jarowinkler() {
            console.log(`Frequency of Measure: ${this[measureFrequencySymbol]} hours.`);
            const result = { diffMeasure:  super.jarowinkler() };
            result.hours = this[measureFrequencySymbol];
            return result;
         }
    }

    //define promise
    var promise = new Promise( (resolve, reject) => {
        //async call
        request( theurl,   (error, response, html) => {
            if (!error && response.statusCode == 200) {
                 resolve( html.substring(0,14) );
            }
            else{
                reject(error);
            }
        });
    });

    return promise.then((result) => {
                console.log('successful remote file read >> : ', result);
                var ts = new TimeStamper( theurlHTML, result, hours);
                return ts;
             });
}

module.exports = app;