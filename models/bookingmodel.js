const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  resturant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RestaurantDetails",
  },
  numofpeople: { type: Number, required: true },
});

module.exports = mongoose.model("Bookings", BookingSchema);
