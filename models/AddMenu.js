const mongoose = require("mongoose");

const AddMenu = new mongoose.Schema({
  menuItem: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    // required: true,
  },
  pic: {
    type: String,
    // required: true,
  },
  cuisines: {
    type: String,
  },
  price: {
    type: Number,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("AddMenu", AddMenu);
