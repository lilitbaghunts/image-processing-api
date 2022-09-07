const fs = require('fs')
const Store = require('../models/store')
const Product = require('../models/product')
const imagePath = `./uploads/product-images`
const runWorker = require('../utils/runWorker')

const createProductImage = async (req, res, next) => {
  try {
    const { id } = req.params

    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(400).json('product not found')
    }
    let store = await Store.findByPk(product.get('store_id'))
    runWorker({
      productId: product.get('id'),
      productImage: req.file.filename,
      watermarkImage: store.watermark_image
    }).then(() => {
      const image = product.get('image')
      if (image && fs.existsSync(`${imagePath}/${image}`)) {
        fs.unlinkSync(`${imagePath}/${image}`)
      }
      product.update({ image: req.file.filename })
    })

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
    if (fs.existsSync(`${imagePath}/${product.image}`)) {
      fs.createReadStream(`${imagePath}/${product.image}`)
          .pipe(res);
    }
    return res.status(404).json({ message: 'no image found' })
  } catch(err) {
    console.log(err)
    next()
  }

}

const getProductThumbnail = async (req, res, next) => {
  try {
    const { id } = req.params
    let product = await Product.findByPk(id, { raw: true })
    if (fs.existsSync(`./uploads/thumbnails/thumbnail-product-${product.id}.jpg`)) {
      return fs.createReadStream(`./uploads/thumbnails/thumbnail-product-${product.id}.jpg`)
          .pipe(res);
    }
    return res.status(404).json({ message: 'no image found' })
  } catch(err) {
    console.log(err)
    next()
  }
}

module.exports = {
  createProductImage,
  getProductImage,
  getProductThumbnail
}
