import multer from "multer"
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + uniqueSuffix)
    
  }
})

 export const upload = multer({ storage: storage })