const mongoose = require("mongoose");

const Generalinfo = new mongoose.Schema({
  image: {
    type: String,
    // required: true,
  },
  BusinessName: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  POCName: {
    type: String,
    required: true,
  },
  POCContact: {
    type: String,
    required: true,
  },
  CustomerContact: {
    type: String,
    required: true,
  },
  CustomerContact: {
    type: String,
    required: true,
  },
  CuisineCategory: {
    type: [String],
    required: true,
  },
  CuisineType: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Generalinfo", Generalinfo);
