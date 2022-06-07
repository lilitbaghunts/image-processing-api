const { Worker } = require('worker_threads');

module.exports = async (data) => {
    return new Promise((resolve, reject) => {
        const { productId, productImage, watermarkImage } = data
        const worker = new Worker('./scripts/composite.js', {
            workerData: {
                productId,
                productImage,
                watermarkImage
            }
        })
        worker.on("message", resolve)
        worker.on("error", reject)
        worker.on("exit", code => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`))
            }
        })
    })
}