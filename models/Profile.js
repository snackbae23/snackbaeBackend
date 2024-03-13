const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  fullName: {
    type: String,
    trim: true,
  },
  email:{
    type: String,
    required:true,
  },
  anniversary: {
    type: String,
  },
  image: {
    type: String,
    // required: true,
  },
  foodPreference : {
    type : String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
