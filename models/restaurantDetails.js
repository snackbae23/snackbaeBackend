const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for the restaurant details
const restaurantDetails = new Schema({
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
  selectedCategory: { type: [String] },
  selectedCuisine: { type: [String] },
});

// Create model from schema
const RestaurantDetails = mongoose.model(
  "RestaurantDetails",
  restaurantDetails
);

module.exports = RestaurantDetails;
