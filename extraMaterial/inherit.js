"use strict";
//builds on : http://www.sitepoint.com/understanding-ecmascript-6-class-inheritance/


//ES6 style class
class CreatureES6 {
    constructor(name, noise) {
        this.name = name;
        this.noise = noise;
    }

    introduceSelf() {
        console.log("I am " + this.name);
    }

    makeNoise() {
        console.log("I say " + this.noise);
    }
}

var hog = new CreatureES6('Piggy', 'oink');
var eagle = new CreatureES6('Eagle', 'screech');

hog.introduceSelf();
hog.makeNoise();
eagle.introduceSelf();
eagle.makeNoise();


//demonstration of ES6 class inheritance syntax
var legsCountSymbol = Symbol();

class InsectES6 extends CreatureES6 {

    constructor(name, noise) {
        super(name, noise);      ///call constructor above
        this[legsCountSymbol] = 0;
    }

    get legsCount() {
        return this[legsCountSymbol];
    }

    set legsCount(value) {
        if (value < 1) {
            console.log("Creatures with no legs not allowed.");
        }
        this[legsCountSymbol] = value;
    }

    introduceSelf() {
        super.introduceSelf();
        console.log("And I have " + this[legsCountSymbol] + " legs!");
    }

    makeNoise() {
        super.makeNoise();
    }

}

var flyES6 = new InsectES6("Fly", "bzzzzzzz");
flyES6.legsCount = 6;

flyES6.introduceSelf();
flyES6.makeNoise();
