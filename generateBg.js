
var fs = require('fs')
var Canvas = require('canvas')
var width = 1366;
var height = 768;
var canvas = Canvas.createCanvas(width, height)
var ctx = canvas.getContext('2d')
var pixelSize = 65;
var getDirName = require('path').dirname;
var mkdirp = require('mkdirp');
var randomHex = [];
function generateBg() {
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
            ctx.drawImage(img, (width / 2 - img.width / 4), (height / 2 - img.height / 4), img.width / 2, img.height / 2);
            var img = canvas.toDataURL();
            var data = img.replace(/^data:image\/\w+;base64,/, "");
            var buf = Buffer.from(data, 'base64');
            mkdirp(getDirName('output/output.png'), function (err) {
                if (err) return cb(err);
            fs.writeFileSync('output/output.png', buf);
            console.log("The file is generated inside the /output folder");
            });
        })
        return randomColor;
}

generateBg()
module.exports = generateBg;
module.exports = randomHex;