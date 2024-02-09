const express = require("express");
const router = express.Router();
const { addPayout } = require("../Controllers/payout");

// Route for adding a new payout method
router.post("/payout", addPayout);

module.exports = router;
