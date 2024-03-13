const AddMenu = require("../models/AddMenu");
const restaurantDetails = require("../models/restaurantDetails");
// Function to add a menu item
const addMenuItem = async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const { menuItem, type, pic, cuisines } = req.body;

  try {
    // Create a new menu item
    const newMenuItem = new AddMenu({
      menuItem,
      type,
      pic,
      cuisines,
    });

    // Save the new menu item
    await newMenuItem.save();

    // Find the restaurant by ID
    const restaurant = await restaurantDetails.findOneAndUpdate(
      { _id: restaurantId },
      { $push: { menu: newMenuItem._id } },
      { new: true } // Return the updated document
    );

    // Check if the restaurant exists
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMenuItems = async (req, res) => {
  const restaurantId = req.params.restaurantId;

  try {
    // Find the restaurant by ID
    const restaurant = await restaurantDetails.findOne({ _id: restaurantId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Array to store all menu item IDs
    let menuItemIds = [];

    // Iterate over each menu in the restaurant
    for (const menu of restaurant.menu) {
      // Concatenate menu item IDs to menuItemIds array
      menuItemIds = menuItemIds.concat(menu._id);
    }

    // Find all menu items for the restaurant using the concatenated menuItemIds array
    const menuItems = await AddMenu.find({ _id: { $in: menuItemIds } });

    res.status(200).json(menuItems);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addMenuItem,
  getMenuItems,
};