const AddMenu = require("../models/AddMenu");

// Function to add a menu item
const addMenuItem = async (req, res) => {
  const { ItemName, cuisineType, Type, Cuisines } = req.body;
  const imageUrl = req.file.location; // Assuming the URL of the uploaded image from DigitalOcean Spaces

  try {
    const menuItem = new AddMenu({
      ItemName,
      cuisineType,
      image: imageUrl,
      Type,
      Cuisines,
    });

    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await AddMenu.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addMenuItem,
  getMenuItems,
};
