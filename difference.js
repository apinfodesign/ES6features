//demonstrating ES6 syntax with the npm 'natural' model for natural language processing.
//We demonstrate  two math methods to find out how different any two strings are.

"use strict";

var natural = require('natural');
var tokenizer = new natural.WordTokenizer();

//data - example strings
var string1 = "your dog has some nice thing ";  //standard
var string2 = "your dog has some nice things";  //slight
var string3 = "your dog has thus four every";   //50% different?
var string4 = "this cat did play tall times";   //100% different?
var string5 = ".... ... ... .... .... .....";   //100% different?


//simple function in ES6
var howDifferentJW = (time1, time2) => {
    console.log('JaroWinkler differenceFinder');
    console.log(`time 1: ${time1}`);    //example of template strings, here and below
    console.log(`time 2: ${time2}`);
    console.log(`JaroWinkler Distance: ${natural.JaroWinklerDistance(time1, time2)}`);
}

//tried giving time2 default argument value but Node 5.3 does not allow
//
//  var howDifferentDice = (time1, time2=" ") => {
//
var howDifferentDice = (time1, time2) =>
    {
    console.log('Dice differenceFinder');
    console.log(`time 1: ${time1}`);
    console.log(`time 2: ${time2}`);
    console.log(`Dice Coefficient:  ${ natural.DiceCoefficient(time1, time2) } `);
    console.log();
}


//define class in ES6
class differenceFinder {

    constructor(time1, time2) {
        this.first = time1;
        this.second = time2;
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



//howDifferentJW(string1, string3);
//howDifferentDice(string1,string3);

//create instance with two input strings

var df = new differenceFinder(string1, string4);

//cal both methods on instance of class differenceFinder
//df.dice();
//df.jarowinkler();

module.export = df;