
const GeneralInfo = require("../models/Generalinfo");
const restaurantDetails=require("../models/restaurantDetails")

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

const getGeneralInfo = async (req, res) => {
  const restaurantId = req.params.restaurantId;

  try {
    // Find the restaurant by ID
    const restaurantInfo = await restaurantDetails.findOne({
      _id: restaurantId,
    });
    if (!restaurantInfo) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // If restaurant info is found, return it as JSON response
    res.json(restaurantInfo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addGeneralInfo,
  getGeneralInfo,
};
