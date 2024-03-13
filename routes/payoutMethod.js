const express = require("express");
const router = express.Router();
const { PayooutMethod, getPayoutData } = require("../Controllers/PayoutMethod");

// Route for adding a new payout method
router.post("/payoutMethod/:restaurantId", PayooutMethod);
router.get("/payoutMethod/:restaurantId", getPayoutData);


module.exports = router;
