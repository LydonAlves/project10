const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    //we create a folder that we want to be in cloudinary
    folder: 'Event',
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
  }
})

const upload = multer({ storage })
module.exports = upload
