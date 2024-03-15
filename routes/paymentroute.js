const express = require("express");
const router = express.Router();
const {
  capturePaymentForRestaurant,
  verifyPaymentForRestaurant,
  getAllPaymentsByRestaurantByDate,
} = require("../Controllers/paymentController");

// Route to capture payment for a restaurant
router.post("/payment/capturepayment", capturePaymentForRestaurant);

// Route to verify payment for a restaurant
router.post("/payment/verifypayment", verifyPaymentForRestaurant);

router.get("/payment/:restaurantId/:date", getAllPaymentsByRestaurantByDate);

module.exports = router;
