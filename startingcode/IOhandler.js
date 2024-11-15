const fs = require("node:fs/promises");
const PNG = require("pngjs").PNG;
const stream = require("node:stream/promises");
const path = require("path");
const yauzl = require("yauzl-promise");

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
            if (zip.isZip64) {
                const readStream = await entry.openReadStream();
                const writeStream = await fs.createWriteStream(
                    `${pathOut}${entry.filename}`
                );
                await stream.pipeline(readStream, writeStream);
            }
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
    const directories = await fs.readdir(dir)
    return directories;
};
//
// /**
//  * Description: Read in png file by given pathIn,
//  * convert to grayscale and write to given pathOut
//  *
//  * @return {promise}
//  * @param pathIn
//  * @param pathOut
//  */
// const grayScale = (pathIn, pathOut) => {
//
// };
//
// module.exports = {
//     unzip,
//     readDir,
//     grayScale,
// };
