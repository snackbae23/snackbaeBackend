
const mongoose = require("mongoose");

const PayoutMethodSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    
  },
  beneficiaryName: {
    type: String,
    
  },
  ifscCode: {
    type: String,
    
  },
  paymentType: {
    type: String,
    
  },
  upi: {
    type: String,
    
  },
  upinNumber: {
    type: String,
    
  },
});

module.exports = mongoose.model("PayoutMethod", PayoutMethodSchema);
