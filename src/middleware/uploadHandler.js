const multer = require('multer');

module.exports = (dest) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0];
      const ext = file.originalname.split('.')[1];
      cb(null, `${name}_${(new Date().getMilliseconds())}.${ext}`)
    }
  })
  return multer({ storage: storage })
}
