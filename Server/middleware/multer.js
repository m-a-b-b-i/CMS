const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../middleware/cloudinary");

// configure multer storage engine to upload files to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "NamazyUsers",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// configure multer middleware to handle file upload
const upload = multer({ storage: storage });

module.exports = upload;
