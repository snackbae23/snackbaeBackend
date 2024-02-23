const restaurantDetails = require("../models/restaurantDetails");
const restaurantLogin = require("../models/restaurantLogin");
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
      salesRepresentative,
      selectedCategory,
    } = req.body;

    // const otp = await otpGenerator.generate(6,{digits:true,upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false});
    const otp = await otpGen();
    console.log(otp);

    const response = await restaurantDetails.create({
      restaurantName,
      cuisinesServed: selectedCuisine,
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
      salesRepresentative,
      category: selectedCategory,
    });
    console.log(req.body.authorizedMail);

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(otp, 10);
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
    const populatedLogin = await restaurantLogin
      .findById(restaurantLogin._id)
      .populate("details")
      .exec();

    const mail = await mailSender(
      email,
      "Greetings from SnackBae",
      restaurantLoginEmail(authorizedMail, otp)
    );

    res.status(201).json({
      success: true,
      response,
      responseLogin,
      populatedLogin,
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
