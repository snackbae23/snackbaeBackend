const express = require("express");
const router = express.Router();

const {
  allrestaurantDetails,
  restaurantDetailsByName,
} = require("../Controllers/search");

router.get("/search", allrestaurantDetails);
router.get("/searchRestaurant", restaurantDetailsByName);

module.exports = router;
