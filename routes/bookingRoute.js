const express = require("express");
const router = express.Router();

// Import controllers
const {
  createBooking,
  editBooking,
  getAllBookingsByRestaurant,
  getAllBookingsByRestaurantByDate,
  deleteBooking,
} = require("../Controllers/booking");

// Routes
router.post("/bookings/:userId/:restaurantId", createBooking);
router.put("/bookings/:bookingId", editBooking);
router.delete("/bookings/:bookingId", deleteBooking);
router.get("/bookings/:restaurantId", getAllBookingsByRestaurant);
router.get("/bookings/find/:restaurantId/:date",getAllBookingsByRestaurantByDate);

module.exports = router;
