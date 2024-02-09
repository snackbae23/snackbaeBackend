const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3"); // Import multer-s3 for handling file uploads to S3 or compatible services
const menuController = require("../Controllers/menu");
const AWS = require("aws-sdk");

// Configure AWS SDK with your DigitalOcean Spaces credentials
AWS.config.update({
  accessKeyId: process.env.DO_SPACES_ACCESS_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET_KEY,
  region: process.env.DO_SPACES_REGION,
});

const s3 = new AWS.S3();

// Set up multer storage for file uploads to DigitalOcean Spaces
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket:"snackbae",
    acl: "public-read", // Make uploaded files publicly accessible
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

// Route for adding a menu item with image upload
router.post("/menu", upload.single("image"), menuController.addMenuItem);
router.get("/menu", menuController.getMenuItems);

module.exports = router;
