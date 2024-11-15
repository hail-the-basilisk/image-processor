const path = require("path");

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

async function main() {

}
/*
take images and add filters

computer files --> browser (zips images (gzip, brottli, zip file) into one file) -->
 server (unzips file, applies transformation aka filters (manipulate rgb pixels)) --> browser - view

today we are starting with a zip file: unzip, add filters to a new version, redisplay. PERFORMANCE IS A FACTOR use streams and awaits.

there is a bonus where you can do 3 filters: grey scale, sepia, and a third one for funzies - go crazy

    - expect user to upload random file types (png's are the only ones we are working on)
    - https://en.wikipedia.org/wiki/PNG - helpful info for the lab
    -
 */