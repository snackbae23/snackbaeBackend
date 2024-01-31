// Import the required modules
const express = require("express");
const { verifyLogin, retryOTP, sendOTP } = require("../Controllers/Auth");
const router = express.Router();




// Route for sending OTP to the user's number
router.post("/sendotp", sendOTP)

// Route for retry OTP 
router.post("/retryotp", retryOTP)

// Route for verifying OTP 
router.post("/verifyotp", verifyLogin)

module.exports = router;