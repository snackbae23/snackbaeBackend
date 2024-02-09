const express = require("express");
const router = express.Router();
const { addGeneralInfo } = require("../Controllers/generalinfo");

// POST route to add general information
router.post("/generalinfo", addGeneralInfo);

module.exports = router;
