
var fs = require('fs')
var Canvas = require('canvas')
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var image = {
    "width": 0,
    "height": 0,
    "pixelSize": 0,
    "logoSize": 0
}
var randomHex = [];
function generateBg(width, height, pixelSize, logoSize) {
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
    fs.readFile(__dirname + '/source/javascript.png', function (err, data) {
        if (err) throw err;
        var img = new Canvas.Image; // Create a new Image
        img.src = data;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, (width / 2 - logoSize / 2), (height / 2 - logoSize / 2), logoSize, logoSize);
        var img = canvas.toDataURL();
        var data = img.replace(/^data:image\/\w+;base64,/, "");
        var buf = Buffer.from(data, 'base64');
        mkdirp(getDirName('output/pixelateJs.png'), function (err) {
            if (err) return cb(err);
            fs.writeFileSync('output/pixelateJs.png', buf);
            console.log('\x1b[32m%s\x1b[0m', ' ✓ The file was generated in the /output folder');
        });
    })
    return randomColor;
}

function assignValue(variable, value) {
    if (value) {
        image[variable] = parseInt(value)
    }
    else {
        image[variable] = 0;
    }
}

const askWidth = () => {
    return new Promise((resolve, reject) => {
        rl.question('1: Enter the width of your Image (px) : ', (answer) => {
            assignValue("width", parseInt(answer))
            resolve()
        })
    })
}

const askheight = () => {
    return new Promise((resolve, reject) => {
        rl.question('2: Enter the height of your Image (px) : ', (answer) => {
            assignValue("height", parseInt(answer))
            resolve()
        })
    })
}

const askPixel = () => {
    return new Promise((resolve, reject) => {
        rl.question('3: Enter the pixel square size for the background (px) : ', (answer) => {
            assignValue("pixelSize", parseInt(answer))
            resolve()
        })
    })
}

const askJs = () => {
    return new Promise((resolve, reject) => {
        rl.question('4: Enter the size for the JS logo (px) : ', (answer) => {
            assignValue("logoSize", parseInt(answer))
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
    generateBg(image.width, image.height, image.pixelSize, image.logoSize);
}

generateBackground()
module.exports = generateBackground;
module.exports = randomHex;