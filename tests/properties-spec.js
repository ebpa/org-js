var fs = require('fs');
var expect = require('chai').expect;
var Parser = require('../lib/org/parser').Parser;

var properties = String(fs.readFileSync("tests/properties.org"));
var parser = new Parser();

describe('test preamble', function() {
    it('loads test org files', function() {
        expect(typeof properties === "string").to.be.true;
        expect(properties.length).to.be.greaterThan(0);
    })
});

describe('property drawers', function() {
    it('parses single UUID ID\'s', function() {
        var parsed = parser.parse(properties);
        expect(parsed.nodes.length).to.equal(5);
        expect(parsed.nodes[0].properties.ID).to.equal("a0fe895f-e892-4247-8d53-c3f3f821243e");
    });
});