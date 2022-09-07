const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadHandler')
const storeController = require('../controllers/storeController');
const uploadDest = './uploads/watermarks'

router.get('/store/:id/watermark', storeController.getWatermark);
router.post('/store/:id/watermark', upload(uploadDest).single('file'), storeController.createWatermark);

module.exports = router;
