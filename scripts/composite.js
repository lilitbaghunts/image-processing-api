const Jimp = require('jimp')
const { workerData, parentPort } = require("worker_threads")

const { productId, productImage, watermarkImage, cb } = workerData
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
    console.log('read image')
    return data[0].composite(data[1].resize(512, 512), 0, 0)
}).then(data => {
    data.write(`./uploads/thumbnails/${FILENAME}.jpg`, () => {
        console.log('wrote image')
        parentPort.postMessage('wrote image')
    })
}).catch(err => {
    console.log(err)
})
