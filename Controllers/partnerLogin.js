const restaurantLogin = require("../models/restaurantLogin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.partnerLogin = async(req,res) => {
    const {username,password} = req.body;
    
    let user =  await restaurantLogin.findOne({username});
    if(!user)
    {
        return res.status(401)({
            success:false,
            message:"User doesn't exists!",
        });
    }

    const payload = {
        username:user.username,
        id:user._id,
    };

    if(await bcrypt.compare(password,user.password))
    {
        let token = jwt.sign(payload,
                            process.env.JWT_SECRET,
                            {
                                expiresIn:"24h",
                            });
        user=user.toObject();
        user.token = token;
        user.password = undefined;
        const options = {
            expires : new Date(Date.now()+5*24*60*60*1000),
            httpOnly:true,
        };

        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"logged in successfully",
        });

    }
    else{
        return res.status(403).json({
            success:false,
            message:"Passwords do not match",
        });
    }
}