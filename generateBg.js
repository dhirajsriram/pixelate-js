
var fs = require('fs')
var Canvas = require('canvas')
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var randomHex = [];
var width = 0;
var height = 0;
var pixelSize = 0;
var logoSize = 0;

function generateBg() {
    var canvas = Canvas.createCanvas(width, height)
    var ctx = canvas.getContext('2d')

    var getDirName = require('path').dirname;
    var mkdirp = require('mkdirp');

    // Paints pixels with random colors
    for (let x = 0; x < width; x = x + pixelSize) {
        for (let y = 0; y < height; y = y + pixelSize) {
            var randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
            randomHex.push(randomColor);
            ctx.fillStyle = randomColor
            color = "#"
            ctx.fillRect(x, y, pixelSize, pixelSize)
        }
    }
    // Creates an image with pixelated colors as the background
    fs.readFile(__dirname + '/source/javascript.jpeg', function (err, data) {
        if (err) throw err;
        var img = new Canvas.Image; // Create a new Image
        img.src = data;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, (width / 2 - logoSize/2), (height / 2 - logoSize/2), logoSize, logoSize);
        var img = canvas.toDataURL();
        var data = img.replace(/^data:image\/\w+;base64,/, "");
        var buf = Buffer.from(data, 'base64');
        mkdirp(getDirName('output/output.png'), function (err) {
            if (err) return cb(err);
            fs.writeFileSync('output/output.png', buf);
            console.log('\x1b[32m%s\x1b[0m', ' ✓ The file was generated in the /output folder');
        });
    })
    return randomColor;
}

const askWidth = () => {
    return new Promise((resolve, reject) => {
        rl.question('1: Enter the width of your Image (px) : ', (answer) => {
            width = parseInt(answer);
            resolve()
        })
    })
}

const askheight = () => {
    return new Promise((resolve, reject) => {
        rl.question('2: Enter the height of your Image (px) : ', (answer) => {
            height = parseInt(answer);
            resolve()
        })
    })
}

const askPixel = () => {
    return new Promise((resolve, reject) => {
        rl.question('3: Enter the pixel square size for the background (px) : ', (answer) => {
            pixelSize = parseInt(answer)
            resolve()
        })
    })
}

const askJs = () => {
    return new Promise((resolve, reject) => {
        rl.question('3: Enter the size for the JS logo (px) : ', (answer) => {
            logoSize = parseInt(answer)
            resolve()
        })
    })
}


const generateBackground = async () => {
    await askWidth()
    await askheight()
    await askPixel()
    await askJs()
    rl.close()
    generateBg();
}

generateBackground()
module.exports = generateBg;
module.exports = randomHex;