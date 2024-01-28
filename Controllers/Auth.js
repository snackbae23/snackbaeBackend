
const User = require("../models/User");
const SendOtp = require("sendotp");
const otpGenerator = require("otp-generator");

const sendOtp = new SendOtp("414842AzNRONCS65b665ccP1");


exports.sendOTP = async (req, res) =>  {

    //fetch number from request ki body
 
            const { contactNumber } = req.body;
            //existing user
            const user = await User.findOne({ contactNumber })
            //generate otp
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            console.log("OTP generated: ", otp);
        
            //sending otp
            sendOtp.send(contactNumber, user._id, otp, (error, data) => {
                if (error) {
                    console.error('Error sending OTP:', error);
                    res.status(500).json({ status: 'error', message: 'Failed to send OTP' });
                } else {
                    console.log('OTP sent successfully:', data);
                    res.json({ status: 'success', message: 'OTP sent successfully' });
                }
            });
        };
     
        
        //otp verification
        exports.verifyLogin = async (req, res) => {
                const { contactNumber,otp } = req.body;
                 sendOtp.verify(contactNumber, otp, (error, data) => {
                   if (error) {
                     console.error("Error verifying OTP:", error);
                     res
                       .status(500)
                       .json({
                         status: "error",
                         message: "Failed to verify OTP",
                       });
                   } else {
                     if (data.type === "success") {
                       console.log("OTP verified successfully: login completed", data);
                       res.json({
                         status: "success",
                         message: "OTP verified successfully;login completed",
                       });
                         
                     } else {
                       console.log("Invalid OTP:", data);
                       res
                         .status(400)
                         .json({ status: "error", message: "Invalid OTP" });
                     }
                   }
                 });
            const profileDetails = await Profile.create({
              gender: null,
              dateOfBirth: null,
              about: null,
              contactNumer: null,
            });

            const user = await User.create({
              firstName,
              lastName,
              email,
              contactNumber,
              
              additionalDetails: profileDetails._id,
              image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastName}`,
            });
        };
        
        
 exports.retryOTP = async (req, res) => {
    const { contactNumber, otp } = req.body;
    sendOtp.retry(contactNumber, otp, (error, data) => {
     if (error) {
         console.error('Error retrying OTP:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retry OTP' });
    } else {
    console.log('OTP retry initiated successfully:', data);
    res.json({ status: 'success', message: 'OTP retry initiated successfully' });
             }
        });
};

