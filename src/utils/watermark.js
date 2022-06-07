const Jimp = require('jimp');
const baseUrl = process.env.BASE_URL

module.exports = async (data) => {
  // var fileName = file.filename;
  // var imageCaption = 'Image caption';
  // var loadedImage;
  //
  // Jimp.read(fileName)
  //     .then(function (image) {
  //         loadedImage = image;
  //         return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
  //     })
  //     .then(function (font) {
  //         loadedImage.print(font, 10, 10, imageCaption)
  //                    .write(fileName);
  //     })
  //     .catch(function (err) {
  //         console.error(err);
  //     });
  const { productId, productImage, watermarkImage } = data

  // const productImagePath = `${baseUrl}/uploads/product-images/${productImage}`

  // const watermark = `${baseUrl}/uploads/watermarks/${watermarkImage}`

  const LOGO_MARGIN_PERCENTAGE = 50;

  const FILENAME = `thumbnail-product-${productId}`
    // const [image, logo] = await Promise.all([
      // Jimp.read(productImage),
    //   Jimp.read(watermark)
    // ]);
    // image.resize(512, 512)

    // Jimp.read('lenna.png')
    // .then(lenna => {
    //   return lenna
    //     .resize(256, 256) // resize
    //     .quality(60) // set JPEG quality
    //
     // set greyscale
    //     .write('lena-small-bw.jpg'); // save
    // })
    // .catch(err => {
    //   console.error(err);
    // });
    // logo.resize(image.bitmap.width / 10, Jimp.AUTO);


    try {
      // const [image, logo] = await Promise.race([
      // Jimp.read(`./uploads/product-images/${productImage}`),
      // Jimp.read(`./uploads/watermarks/${watermarkImage}`)
      // ]);
      const image = await Jimp.read(`./uploads/product-images/${productImage}`);
      const logo = await Jimp.read(`./uploads/watermarks/${watermarkImage}`)
      const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 90;
      const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 120;

      const X = image.bitmap.width - logo.bitmap.width - xMargin;
      const Y = image.bitmap.height - logo.bitmap.height - yMargin;
      // if (image) {
        const composed = await image.composite(logo, X, Y, [
          {
            mode: Jimp.BLEND_SCREEN,
            opacitySource: 0.1,
            opacityDest: 1
          }
        ])
        composed
            .resize(512, 512)
            .quality(60)
            .write(`./uploads/thumbnails/${FILENAME}.jpg`)
      // }

      return FILENAME
    } catch (error) {
      console.log(error);
    }
}
