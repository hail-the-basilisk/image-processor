const path = require("path");

const {unzip, readDir, grayScale} = require("./IOhandler");

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