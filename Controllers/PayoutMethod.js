const PayoutMethod = require("../models/PayoutMethod");
const restaurantDetails = require("../models/restaurantDetails");
// Controller function to add a new payout method
const PayooutMethod = async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const {
    accountNumber,
    ifscCode,
    beneficiaryName,
    upi,
    upinNumber,
    paymentType,
  } = req.body;

  try {
    const payoutmethod = new PayoutMethod({
      accountNumber,
      ifscCode,
      beneficiaryName,
      upi,
      upinNumber,
      paymentType,
    });

    const newPayout = await payoutmethod.save();
    const restaurant = await restaurantDetails.findOneAndUpdate(
      { _id: restaurantId },
      { payoutmethod: payoutmethod._id },
      { new: true } // Return the updated document
    );
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(201).json(newPayout);
  } catch (err) {
    res.status(400).json({
       message: err.message });
  }
};

const getPayoutData = async (req, res) => {
  const restaurantId = req.params.restaurantId;

  try {
    // Find the restaurant by ID
    const restaurant = await restaurantDetails.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Retrieve payout methods for the restaurant
    const payoutMethods = await PayoutMethod.find({
      _id: { $in: restaurant.payoutmethod },
    });

    res.status(200).json(payoutMethods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  PayooutMethod,
  getPayoutData,
};