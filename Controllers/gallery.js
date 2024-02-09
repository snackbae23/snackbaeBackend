const Gallery = require("../models/gallery");

// Function to upload images to the gallery
const uploadImages = async (req, res) => {
  console.log(req)
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images were uploaded." });
    }

    // Extract file paths from uploaded files
    const imagePaths = req.files.map((file) => file.path);

    // Create a new gallery object with the extracted image paths
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
