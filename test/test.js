var app = require('../app');
var assert = require('assert');

//test harness data
var theurl      = "http://apinfodesign.com"; // web site for testing
var theurlHTML  = "<!DOCTYPE";  //simulates snapshot string from web site at T - X hours
const hours     = 4; //testing value for hours between measurements

describe('difference checker... ', function() {

    before( function(done) {
        done();
    });


    it('tests TimeStamper with Dice', function(done){
            app( theurl, theurlHTML, hours)
            .then(ts => {
            assert.deepEqual( ts.dice(), { diffMeasure: 0.8421052631578947, hours: 4 }
        )
        done();
    })
        .catch(done);
    }
    );


    it('tests TimeStamper with JaroWinkler', function(done){
        app( theurl, theurlHTML, hours).then(ts => {
            assert.deepEqual( ts.jarowinkler(), { diffMeasure: 0.9285714285714286, hours: 4 }
        )
        done();
        })
        .catch(done);
    }
    );


    it('tests measure frequency with JaroWinkler', function(done){
        var hours= 9;
        console.log(app( theurl, theurlHTML, hours) );
        app( theurl, theurlHTML, hours).then(ts => {
            assert.deepEqual( ts.jarowinkler(), { diffMeasure: 0.9285714285714286, hours: 9 }
        )
        done();
    })
        .catch(done);
    }
    );


    it('tests against Google.com with jarowinkler', function(done){
        var theurl = 'http://www.google.com' ;
        var hours= 9;
        app( theurl, theurlHTML, hours).then(ts =>  {
            assert.deepEqual( ts.jarowinkler(), { diffMeasure: 0.9047619047619048, hours: 9 }
        )
        done();
    })
        .catch(done);
    }
    );


    it('tests negative hour error message w JaroWinkler', function(done){
            var hours= -1;
            console.log(app( theurl, theurlHTML, hours) );
            app( theurl, theurlHTML, hours).then(ts => {
                assert.deepEqual( ts.jarowinkler(), { diffMeasure: 0.9285714285714286, hours: -1 }
            )
            done();
        })
            .catch(done);
        }
    );


    after (function(done) {
        done();
    });


});