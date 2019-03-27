# pixelify-js

A node script that generates a random coloured pixelated wallpaper with an awesome JS logo at the center (Nothing complex just a straight forward image creation library) . Show your 💗 for JavaScript

## Dependencies required
- "canvas": "^2.4.1",
- "chai": "^4.2.0",
- "chai-files": "^1.4.0"
- "get-image-colors": "^2.0.0"

## Running

- Import or do a require statement for pixelate-js in your application

```js
var pixelate = require("pixelate-js")
```

- Run your node application as follows

```
node <file-name>.js
```

- Type the width of the image when prompted (pixels)
- Type the height of the image when prompted (pixels)
- Type the size of the pixels in the backdrop when prompted (pixels)
- Type the size of the js logo in the backdrop when prompted (pixels)

## Testing

- To test the package navigate to module directory

```
cd .\node_modules\pixelate-js
```

- Use the command below

```
npm run test
```

- Tests if the image is created
- Scans the image to check if it has a pixelated backdrop
- Checks if the colors in the background are random

## Snippets

### Generate pixels with the specified size and random colors

``` js
  for (let x = 0; x < width; x = x + pixelSize) {
            for (let y = 0; y < height; y = y + pixelSize) {
                var randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
                randomHex.push(randomColor);
                ctx.fillStyle = randomColor
                color = "#"
                ctx.fillRect(x, y, pixelSize, pixelSize)
            }
        }
```

### Autocomplete based on the array

``` js
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
```

## Output

The output is generated inside the /output and named as output.png

![alt text](https://github.com/dhirajsriram/node-pixelate/blob/master/output/output.png?raw=true)
