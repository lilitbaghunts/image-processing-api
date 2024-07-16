const fs = require('fs')
const path = require('path')
const Store = require('../models/store')
const Product = require('../models/product')
const runWorker = require('../utils/runWorker')

const watermarkPath = path.join(__dirname, '../uploads/watermarks')

const createWatermark = async (req, res, next) => {
  try {
    const { id } = req.params
    let store = await Store.findByPk(id)
    if (!store) {
      return res.status(400).json('store not found')
    }
    const products = await Product.findAll({
      where: {
        store_id: id
      },
      raw: true
    })
    const currentImage = store.get('watermark_image')
    if (currentImage && fs.existsSync(path.join(watermarkPath, currentImage))) {
      fs.unlinkSync(path.join(watermarkPath, currentImage));
    }
    await store.update({ watermark_image: req.file.filename })
    const promises = products
      .filter(item => item.image)
      .map(item => {
        runWorker({
          productId: item.id,
          productImage: item.image,
          watermarkImage: req.file.filename
        })
    })
    await Promise.all(promises)
    res.status(200).json('success')
  } catch(err) {
    console.log(err)
    next(err)
  }
}

const getWatermark = async (req, res, next) => {
  try {
    const { id } = req.params
    let store = await Store.findByPk(id, { raw: true })
    
    if (store && store.watermark_image && fs.existsSync(path.join(watermarkPath, store.watermark_image))) {
      fs.createReadStream(path.join(watermarkPath, store.watermark_image)).pipe(res);
    } else {
      res.status(404).json({ message: 'no watermark image found' });
    }
  } catch(err) {
    console.log(err)
    next(err)
  }
}

module.exports = {
  createWatermark,
  getWatermark
}
