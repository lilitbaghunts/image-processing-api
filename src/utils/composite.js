const Jimp = require('jimp')

module.exports = data => {
    const {productId, productImage, watermarkImage} = data
    const FILENAME = `thumbnail-product-${productId}`
    const images = [
        `./uploads/product-images/${productImage}`,
        `./uploads/watermarks/${watermarkImage}`
    ]

    const jimps = []
    for (let item of images) {
        jimps.push(Jimp.read(item))
    }

    return Promise.all(jimps).then(data => {
        return Promise.all(data)
    }).then(data => {
        console.log('read image')
        return data[0].composite(data[1], 0, 0)
    }).then(data => {
        data.resize(512, 512).write(`./uploads/thumbnails/${FILENAME}.jpg`, () => {
            console.log('wrote image')
        })
    }).catch(err => {
        console.log(err)
    })
}