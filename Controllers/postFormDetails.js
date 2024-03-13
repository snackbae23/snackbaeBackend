const restaurantDetails = require("../models/restaurantDetails");
const restaurantLogin = require("../models/restaurantLogin");
const becomePartner = require("../models/becomePartner");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../util/mailSender");
const {
  restaurantLoginEmail,
} = require("../mail/template/restaurantLoginEmail");

// const otpGenerator = require('otp-generator');
const { otpGen } = require("otp-gen-agent");

exports.postFormDetails = async (req, res) => {
  try {
    const {
      restaurantName,
      selectedCuisine,
      location,
      managerContact,
      authorizedMail,
      managerName,
      openingHour,
      closingHour,
      offDay,
      capacity,
      numberOfTables,
      paymentMethods,
      pic,
      logo,
      salesRepresentative,
      selectedCategory,
      FSSAInumber,
      averageCost,
      openAllDay,
      latitude,
      longitude,
    } = req.body;

    // const otp = await otpGenerator.generate(6,{digits:true,upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false});
    const otp = await otpGen();
    console.log(otp);
    let resturantId =otp;

    const existingPartner = await becomePartner.findOne({ rname : restaurantName });
    if (existingPartner) {
      await becomePartner.findOneAndDelete({ rname : restaurantName });
  }

    const response = await restaurantDetails.create({
      resturantId,
      restaurantName,
      selectedCuisine,
      location,
      managerContact,
      authorizedMail,
      managerName,
      openingHour,
      closingHour,
      offDay,
      capacity,
      numberOfTables,
      paymentMethods,
      pic,
      logo,
      salesRepresentative,
      selectedCategory,
      FSSAInumber,
      averageCost,
      openAllDay,
      latitude,
      longitude,
    });
    console.log(req.body.authorizedMail);

    let hashedPassword;
    try {
      const salt = await bcrypt.genSalt(10);
     hashedPassword = await bcrypt.hash(otp, salt);
      
    } catch {
      return res.status(500).json({
        success: false,
        message: "Failed to hash password!",
      });
    }

    const responseLogin = await restaurantLogin.create({
      details: response._id,
      username: authorizedMail,
      password: hashedPassword,
    });

    const mail = await mailSender(
      authorizedMail,
      "Greetings from SnackBae",
      restaurantLoginEmail(authorizedMail, otp)
    );

    res.status(201).json({
      success: true,
      response,
      responseLogin,
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      success: false,
      data: "failed to post data",
      message: err.message,
    });
  }
};
