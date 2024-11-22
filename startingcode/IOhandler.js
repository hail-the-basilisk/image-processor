const fs = require("node:fs/promises");
const {createWriteStream} = require("fs");
const {createReadStream} = require("fs");
const PNG = require("pngjs").PNG;
const stream = require("node:stream/promises");
const path = require("path");
const yauzl = require("yauzl-promise");

// const isPng = () => {
//     return new Transform ({
//         transform(chunk, encoding, callback) {
//
//         }
//     })
// }


/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */

const unzip = async (pathIn, pathOut) => {
    await fs.mkdir(pathOut, {recursive: true});
    const zip = await yauzl.open(pathIn);
    try {
        for await (const entry of zip) {
            if (entry.filename.endsWith(path.sep) || entry.filename.startsWith("__")) {
                continue;
            }
                const readStream = await entry.openReadStream();
                const writeStream = createWriteStream(path.join(pathOut,`${entry.filename}`));
                await stream.pipeline(readStream, writeStream);
            }
    } finally {
        await zip.close();
    }
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @return {promise}
 * @param dir
 */
const readDir = async (dir) => {
    return await fs.readdir(dir);
};

//
/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @return {promise}
 * @param pathIn
 * @param pathOut
 */
const grayScale = (pathIn, pathOut) => {  
  console.log(`step 1 \n`);
  fs.mkdir(path.join(`startingcode`,`grayscaled`), {recursive: true})
  createReadStream(pathIn)
  .pipe(
    new PNG()
    )
    .on("parsed", function () {
        console.log(`step 2 \n`);
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            this.data[idx] = this.data[idx] * 0.299;
            this.data[idx + 1] = this.data[idx + 1] * 0.587;
            this.data[idx + 2] = this.data[idx + 2] * 0.144;
          }
        }
    this.pack().pipe(createWriteStream(pathOut));
})
}

//
// module.exports = {
//     unzip,
//     readDir,
//     grayScale,
// };
async function main() {
    await unzip(path.join("startingcode", "myfile.zip"), path.join("startingcode", "unzipped"));
    const directories = await readDir(path.join("startingcode", "unzipped"))
    console.log(directories);
    for (entry of directories) {
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n` + `${entry}\n` + path.join(`startingcode`, `unzipped`, entry));
        console.log(path.join(`startingcode`, `grayscaled`, entry) + `\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        grayScale(path.join(`startingcode`, `unzipped`, entry) , path.join(`startingcode`, `grayscaled`, entry));
    }
}

main();


