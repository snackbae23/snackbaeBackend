const express = require("express");
const router = express.Router();

const {allrestaurantDetails}= require("../Controllers/search")

router.get("/search", allrestaurantDetails);

module.exports = router;