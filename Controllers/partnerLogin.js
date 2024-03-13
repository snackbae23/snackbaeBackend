const restaurantLogin = require("../models/restaurantLogin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.partnerLogin = async (req, res) => {
  const { email, password } = req.body;

  let user = await restaurantLogin.findOne({ username: email }).populate('details');

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "No user found",
    })
  };

  // const payload = {
  //     username:user.username,
  //     id:user._id,
  // };

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      email: user.details.authorizedMail,
      restaurantName: user.details.restaurantName,
      _id: user._id,
      username: user.username,
      // details: user.details,
      token: generateJwt(user.id),
    });
  }
}
