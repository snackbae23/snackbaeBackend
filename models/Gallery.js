const mongoose = require("mongoose");

const Gallery = new mongoose.Schema({

  image: {
    type: [String],
    required: true,
  },
 
});

module.exports = mongoose.model("Gallery", Gallery);
