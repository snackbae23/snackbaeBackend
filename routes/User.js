// Import the required modules

const express = require("express");
// const { verifyLogin, retryOTP, sendOTP } = require("../Controllers/Auth");

const { FindUserByNumber,createUser,createProfile} = require("../Controllers/User");
const router = express.Router();

// Route for sending OTP to the user's number
// router.post("/sendotp", sendOTP)

// Route for retry OTP 
// router.post("/retryotp", retryOTP)

// Route for verifying OTP 
// router.post("/verifyotp", verifyLogin)



router.get("/user/search",FindUserByNumber);
router.post("/user/create",createUser);
router.post("/user/profile/create",createProfile);

module.exports = router;