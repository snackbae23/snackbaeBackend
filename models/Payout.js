const mongoose = require("mongoose");

const Payout = new mongoose.Schema({
  AccountNumber: {
    type: Number,
    // required: true,
  },
  IFSCcode: {
    type: String,
    // required: true,
  },
  BeneficiaryName: {
    type: String,
    // required: true,
  },
  UPI: {
    type: String,
    // required: true,
  },
  UPINumber: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("Payout", Payout);
