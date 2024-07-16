const fs = require('fs')
const path = require('path')
const Store = require('../models/store')
const Product = require('../models/product')
const imagePath = `./uploads/product-images`
const runWorker = require('../utils/runWorker')

const imagePath = path.join(__dirname, '../uploads/product-images');
const thumbnailPath = path.join(__dirname, '../uploads/thumbnails');

const createProductImage = async (req, res, next) => {
  try {
    const { id } = req.params

    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(400).json('product not found')
    }
    let store = await Store.findByPk(product.get('store_id'))
    if (!store) {
      return res.status(400).json('store not found');
    }
    const workerResult = await runWorker({
      productId: product.get('id'),
      productImage: req.file.filename,
      watermarkImage: store.watermark_image
    })
    
    const image = product.get('image')
    if (image && fs.existsSync(path.join(imagePath, image))) {
      fs.unlinkSync(path.join(imagePath, image));
    }
    await product.update({ image: req.file.filename })

    return res.status(200).json('success')
  } catch(err) {
    console.log(err)
    next(err)
  }
}

const getProductImage = async (req, res, next) => {
  try {
    const { id } = req.params
    let product = await Product.findByPk(id, { raw: true })
    if (product && fs.existsSync(path.join(imagePath, product.image))) {
      return fs.createReadStream(path.join(imagePath, product.image)).pipe(res);
    }
    return res.status(404).json({ message: 'no image found' })
  } catch(err) {
    console.log(err)
    next(err)
  }
}

const getProductThumbnail = async (req, res, next) => {
  try {
    const { id } = req.params
    let product = await Product.findByPk(id, { raw: true })
    if (product && fs.existsSync(path.join(thumbnailPath, `thumbnail-product-${product.id}.jpg`))) {
      return fs.createReadStream(path.join(thumbnailPath, `thumbnail-product-${product.id}.jpg`)).pipe(res);
    }
    return res.status(404).json({ message: 'no image found' })
  } catch(err) {
    console.log(err)
    next(err)
  }
}

module.exports = {
  createProductImage,
  getProductImage,
  getProductThumbnail
}
