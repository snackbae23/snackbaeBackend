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
  // console.log(req)
  console.log(req.body)
try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images were uploaded." });
    }

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
           const data = await s3Client.send(new PutObjectCommand(params));
           console.log(
             "Successfully uploaded object: " + params.Bucket + "/" + params.Key
           );
           return data;
         } catch (err) {
           console.log("Error", err);
         }
       };

       // Step 5: Call the uploadObject function.
       uploadObject();
     });
    const gallery = new Gallery({
      image: imagePaths,
    });

    // Save the gallery object to the database
    const savedGallery = await gallery.save();

    res.status(201).json(savedGallery);
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
