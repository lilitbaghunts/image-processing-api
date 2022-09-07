const fs = require('fs')
const Store = require('../models/store')
const Product = require('../models/product')
const runWorker = require('../utils/runWorker')
const imagePath = `./uploads/watermarks`


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
    const image = store.get('watermark_image')
    if (image && fs.existsSync(`${imagePath}/${image}`)) {
      fs.unlinkSync(`${imagePath}/${image}`)
    }
    store.update({ watermark_image: req.file.filename })
    const promises = products.filter(item => item.image).map(item => {
        runWorker({
          productId: item.id,
          productImage: item.image,
          watermarkImage: req.file.filename
        })
    })
    Promise.all(promises)
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
    if (fs.existsSync(`./uploads/watermarks/${store.watermark_image}`)) {
      return fs.createReadStream(`./uploads/watermarks/${store.watermark_image}`)
          .pipe(res);
    }
    return res.status(404).json({ message: 'no image found' })
  } catch(err) {
    console.log(err)
    next(err)
  }
}

module.exports = {
  createWatermark,
  getWatermark
}
