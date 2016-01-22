var natural = require('natural');
tokenizer = new natural.WordTokenizer();

{
    function howDifferent() {
        console.log('how different');
    }
}

howDifferent();

var string1 = "your dog has some nice thing ";  //standard
var string2 = "your dog has some nice things";  //slight
var string3 = "your dog has thus four every";  //50% different?
var string4 = "this cat did play tall times";  //100% different?
var string5 = ".... ... ... .... .... .....";  //100% different?

console.log('Test Strings');
console.log(string1, "  ... is test case 1");
console.log(string2);
console.log(string3);
console.log(string4);
console.log(string5);

console.log();
console.log('JaroWinkler Distance from test case 1');
console.log(natural.JaroWinklerDistance(string1, string2));
console.log(natural.JaroWinklerDistance(string1, string3));
console.log(natural.JaroWinklerDistance(string1, string4));
console.log(natural.JaroWinklerDistance(string1, string5));

console.log('');
console.log('Levenshtein Distance  from test case 1');
console.log(natural.LevenshteinDistance(string1, string2));
console.log(natural.LevenshteinDistance(string1, string3));
console.log(natural.LevenshteinDistance(string1, string4));
console.log(natural.LevenshteinDistance(string1, string5));

console.log();
console.log('Dice\'s Co-efficient from test case 1');
console.log(natural.DiceCoefficient(string1, string2));
console.log(natural.DiceCoefficient(string1, string3));
console.log(natural.DiceCoefficient(string1, string4));
console.log(natural.DiceCoefficient(string1, string5));