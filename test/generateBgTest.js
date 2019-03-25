var expect = require('chai').expect;
var chaiFiles = require('chai-files');
var generateBg = require('../generateBg');

var file = chaiFiles.file;

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

describe('Generate wallpaper', function () {
    it('should generate wallpaper in output folder', function () {
        expect(file('../output/output.png')).to.exist
    });
    it('should generate a non empty array of hexadecimal colors', function () {
        expect(generateBg.length).to.not.equal(0);
    });
    it('should generate an array of random hex', function () {
        // Not necessarily True always , True in general
        expect(hasDuplicates(generateBg)).to.be.equal(false);
    });
  });