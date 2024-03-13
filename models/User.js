const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 
contactNumber:{
    type: String,
    // trim: true,
},
additionalDetails:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});

module.exports = mongoose.model("User", userSchema);