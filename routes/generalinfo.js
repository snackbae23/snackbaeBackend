const express = require("express");
const router = express.Router();
const {
  getGeneralInfo,
  addGeneralInfo,
} = require("../Controllers/generalinfo");

// POST route to add general information
router.post("/generalinfo", addGeneralInfo);
router.get("/generalinfo/:restaurantId", getGeneralInfo);

module.exports = router;
