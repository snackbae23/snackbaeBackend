const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for the restaurant details
const restaurantDetails = new Schema({
  resturantId: { type: String },
  FSSAInumber: { type: String },
  authorizedMail: { type: String },
  averageCost: { type: String },
  capacity: { type: String },
  closingHour: { type: String },
  customerContact: { type: String },
  location: { type: String },
  managerContact: { type: String },
  managerName: { type: String },
  numberOfTables: { type: String },
  offDay: { type: String },
  openAllDay: { type: Boolean },
  openingHour: { type: String },
  paymentMethods: { type: [String] },
  pic: { type: String },
  restaurantName: { type: String },
  salesRepresentative: { type: String },
  selectedCategory: { type: [Object] },
  selectedCuisine: { type: [Object] },
  latitude: { type: Number },
  longitude: { type: Number },

  payoutmethod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PayoutMethod",
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddMenu",
    },
  ],
  gallery: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gallery",
    },
  ],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookings",
    },
  ],
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
});

const RestaurantDetails = mongoose.model(
  "RestaurantDetails",
  restaurantDetails
);

module.exports = RestaurantDetails;
