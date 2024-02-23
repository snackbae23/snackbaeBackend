const Gallery = require("../models/gallery");
const express = require("express");
const formidable = require("formidable");
const fs = require("fs");

const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({
  forcePathStyle: false,
  endpoint: "https://blr1.digitaloceanspaces.com",
  region: "blr1",
  credentials: {
    accessKeyId: "DO00JDPC8ZXPM2J7LM4P",
    secretAccessKey: "1eop5QZAQF58V1JNEG+XrLhreWj+rrgTPPqBFSFC8Uk",
  },
});

// Function to upload images to the gallery
const uploadImages = async (req, res) => {
  
try {
    let image_url;
    // Extract file paths from uploaded files
     const form = new formidable.IncomingForm();
     form.keepExtensions = true;
     form.parse(req, (err, fields, files) => {
       if (err) {
         console.error("Error parsing form data:", err);
         return res.status(500).json({ error: "Internal Server Error" });
       }

       const file = files.someExpressFiles;

       // Log the file object

       const params = {
         Bucket: "snackbaev",
         Key: files.someExpressFiles[0]?.originalFilename,
         Body: fs.createReadStream(files.someExpressFiles[0]?.filepath), // Use file.filepath instead of file.path
         ACL: "public-read",
       };

       const uploadObject = async () => {
         try {
           const data = await s3Client.send(new PutObjectCommand(params))
           image_url=`https://snackbaev.blr1.digitaloceanspaces.com/${params.Key}`
            res.status(201)
              .json({
                image_url: image_url
              });
         } catch (err) {
           console.log("Error", err);
         }
       };

       // Step 5: Call the uploadObject function.
       uploadObject();
     });

    // Save the gallery object to the database
    
  } catch (err) {
    console.error("Error uploading images:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Function to retrieve all images from the gallery
const getAllImages = async (req, res) => {
  try {
    const gallery = await Gallery.findOne(); // Assuming there is only one gallery document

    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.json(gallery.image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  uploadImages,
  getAllImages,
};
