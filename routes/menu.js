const express = require("express");
const router = express.Router();

const menuController = require("../Controllers/menu");

// Route for adding a menu item with image upload
router.post("/menu/:restaurantId", menuController.addMenuItem);
router.get("/menu/:restaurantId", menuController.getMenuItems);

module.exports = router;
