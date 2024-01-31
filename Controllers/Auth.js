
const User = require("../models/User");
const SendOtp = require("sendotp");
const otpGenerator = require("otp-generator");
const twilio =require("twilio")
const sendOtp = new SendOtp("414842AzNRONCS65b665ccP1");


exports.sendOTP = async (req, res) =>  {

    //fetch number from request ki body
 
            const { contactNumber } = req.body;
       
            //generate otp
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            console.log("OTP generated: ", otp);
        
            //sending otp
            const client = new twilio(
              "AC067ff86567eff892cf3c4ce7315d831c",
              "9c32e841712c3d9f816a11349cb0b639"
  );
  return client.messages
    .create({ body: `Otp for your login to SnackBae is ${otp}`, from: "+12055480343", to: contactNumber })
    .then(message => console.log(message))
  .catch(err=>console.log(err))
  
        };
     
        
       

