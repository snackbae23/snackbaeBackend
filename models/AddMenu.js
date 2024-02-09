const mongoose = require("mongoose");

const AddMenu = new mongoose.Schema({
  ItemName: {
    type: String,
    required: true,
  },
  cuisineType: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  Type: {
    type: [String],
    required: true,
  },
  Cuisines: {
    type: [String],
    required: true,
  },
});
 


module.exports = mongoose.model("AddMenu", AddMenu);
