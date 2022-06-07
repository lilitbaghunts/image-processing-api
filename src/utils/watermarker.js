'use strict';

let Jimp = require('jimp')
    ,fs = require('fs')
    // ,fileType = require('file-type');

module.exports = (files) => {

        let promises = [];

        _.forEach(files, (file)=>{

            //Create a new promise for each image processing
            let promise = new Promise((resolve, reject)=>{

            //Resolve image file type
            // let type = fileType(file.buffer);

            //Create a jimp instance for this image
            new Jimp(file.buffer, (err, image)=>{

                //Resize this image
                image.resize(512, 512)
                    //lower the quality by 90%
                    .quality(10)
                    .getBuffer('image/jpeg', (err, buffer)=>{
                        //Transfer image file buffer to base64 string
                        let base64Image = buffer.toString('base64');
                        let imgSrcString = "data:" + 'image/jpeg' + ';base64, ' + base64Image;
                        //Resolve base94 string
                        resolve(imgSrcString);
                    });
                })
            });

            promises.push(promise);
        });

        //Return promise array
        return Promise.all(promises);

};
