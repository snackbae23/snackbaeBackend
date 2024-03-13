const express = require("express");
const router = express.Router();
const {
  capturePaymentForRestaurant,
  verifyPaymentForRestaurant,
} = require("../Controllers/paymentController");

// Route to capture payment for a restaurant
router.post("/payment/capturepayment", capturePaymentForRestaurant);

// Route to verify payment for a restaurant
router.post("/payment/verifypayment", verifyPaymentForRestaurant);

module.exports = router;
