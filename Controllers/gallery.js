const Gallery = require("../models/Gallery");
const express = require("express");
const formidable = require("formidable");
const restaurantDetails = require("../models/restaurantDetails");
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
const uploadGalleryImages = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
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
          const data = await s3Client.send(new PutObjectCommand(params));
          image_url = `https://snackbaev.blr1.digitaloceanspaces.com/${params.Key}`;
          const gallery = new Gallery({
            image: image_url,
          });
          const newgallery = await gallery.save();
          const restaurant = await restaurantDetails.findOneAndUpdate(
            { _id: restaurantId },
            { $push: { gallery: newgallery._id } },
            { new: true } // Return the updated document
          );
          if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
          }
          res.status(201).json(newgallery);
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
 const restaurantId = req.params.restaurantId;

 try {
   // Find the restaurant by ID
   const restaurant = await restaurantDetails.findOne({ _id: restaurantId });
   if (!restaurant) {
     return res.status(404).json({ message: "Restaurant not found" });
   }

   // Array to store all menu item IDs
   let galleryItemIds = [];

   // Iterate over each menu in the restaurant
   for (const gallery of restaurant.gallery) {
     // Concatenate menu item IDs to menuItemIds array
     galleryItemIds = galleryItemIds.concat(gallery._id);
   }

   // Find all menu items for the restaurant using the concatenated menuItemIds array
   const galleryItems = await Gallery.find({ _id: { $in: galleryItemIds } });

   res.status(200).json(galleryItems);
 } catch (err) {
   res.status(400).json({ message: err.message });
 }
};

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
          const data = await s3Client.send(new PutObjectCommand(params));
          image_url = `https://snackbaev.blr1.digitaloceanspaces.com/${params.Key}`;
          res.status(201).json({
            image_url: image_url,
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

module.exports = {
  uploadImages,
  getAllImages,
  uploadGalleryImages,
};
