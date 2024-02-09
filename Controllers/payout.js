const Payout = require("../models/Payout");

// Controller function to add a new payout method
const addPayout = async (req, res) => {
  const { AccountNumber, IFSCcode, BeneficiaryName, UPI, UPINumber } = req.body;

  try {
    const payout = new Payout({
      AccountNumber,
      IFSCcode,
      BeneficiaryName,
      UPI,
      UPINumber,
    });

    const newPayout = await payout.save();
    res.status(201).json(newPayout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addPayout,
};
