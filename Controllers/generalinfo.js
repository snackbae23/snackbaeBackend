const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const GeneralInfo = require("../models/Generalinfo");

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
    bucket: process.env.SPACES_BUCKET_NAME,
    acl: "public-read", // Make uploaded files publicly accessible
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
}).single("image"); // 'image' should match the name attribute in your form input field for the image

// Function to add general information with image upload
const addGeneralInfo = async (req, res) => {
  // Handle image upload
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    // Create a new GeneralInfo object
    const {
      BusinessName,
      Location,
      POCName,
      POCContact,
      CustomerContact,
      CuisineCategory,
      CuisineType,
    } = req.body;
    const imageUrl = req.file.location; // URL of the uploaded image in DigitalOcean Spaces

    try {
      const generalInfo = new GeneralInfo({
        image: imageUrl,
        BusinessName,
        Location,
        POCName,
        POCContact,
        CustomerContact,
        CuisineCategory,
        CuisineType,
      });

      // Save the new general info object to the database
      const newGeneralInfo = await generalInfo.save();
      res.status(201).json(newGeneralInfo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

module.exports = {
  addGeneralInfo,
};
