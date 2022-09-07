const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadHandler')
const productController = require('../controllers/productController');
const uploadDest = './uploads/product-images'


router.get('/product/:id/image', productController.getProductImage);
router.post('/product/:id/image', upload(uploadDest).single('file'), productController.createProductImage);
router.get('/product/:id/thumbnail', productController.getProductThumbnail);

module.exports = router;
