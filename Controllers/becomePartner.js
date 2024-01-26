const  becomePartner= require("../models/becomePartner");

const becomePartnerDataToDB = async (req, res) => {
  try {
    // Extract data from the request body
    const { email, loc, outlet, phone, rname } = req.body;

    // Create a new instance of the DataModel
    const newData = new becomePartner({ email, loc, outlet, phone, rname });

    // Save the data to the database
    const savedData = await newData.save();

    res.status(201).json({
        success:true,
        savedData,
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { becomePartnerDataToDB };