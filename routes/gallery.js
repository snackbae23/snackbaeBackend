const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const galleryController = require("../Controllers/gallery");
const AWS = require("aws-sdk");

// Configure AWS SDK with your DigitalOcean Spaces credentials
AWS.config.update({
  accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
  secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

// Set up multer storage for file uploads to DigitalOcean Spaces
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "snackbae",
    acl: "public-read", // Make uploaded files publicly accessible
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
}).array("images", 10); // 'images' should match the name attribute in your form input field for the images

// Route for uploading images to the gallery
router.post("/gallery", upload, galleryController.uploadImages);

// Route for retrieving all images from the gallery
router.get("/gallery", galleryController.getAllImages);

module.exports = router;
