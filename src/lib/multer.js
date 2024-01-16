const path = require('path');
const multer = require('multer');
const { FILE_UPLOAD_PATH } = require('config').get('constants');

const storage = multer.diskStorage({
  destination: FILE_UPLOAD_PATH,
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

module.exports = multer({ storage });
