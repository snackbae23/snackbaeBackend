const mongoose = require('mongoose');
const mailSender = require('../util/mailSender');
const { becomePartnerEmail } = require('../mail/template/becomePartnerEmail');
const dataSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  loc: {
    type: String,
  },
  outlet: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  rname: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  }
});

dataSchema.post('save', async function (doc) {
  try {
    console.log("doc", doc)

    await mailSender(doc.email, "Greetings from SnackBae", becomePartnerEmail());

  } catch (error) {
    console.error(error)
  }
})

const BecomePartnerModel = mongoose.model("BecomePartnerModel", dataSchema);

module.exports = BecomePartnerModel;