var expect = require('chai').expect;
var fs = require('fs');
const path = require('path')
const getColors = require('get-image-colors')

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

describe('Generate wallpaper', function () {
    it('should generate wallpaper in output folder', function () {
        expect(fs.existsSync(__dirname + "/../output/output.png")).to.be.true
    });
    it('should generate a non empty array of hexadecimal colors', async () => {
        return getColors(path.join(__dirname + "/../output/output.png")).then(function(colors){
            expect((colors.map(color => color.hex())).length).to.not.equal(0);
        });
    });
    it('should generate an array of random hex', function () {
        return getColors(path.join(__dirname + "/../output/output.png")).then(function(colors){
            expect(hasDuplicates(colors.map(color => color.hex()))).to.equal(false);
        });
    });
  });