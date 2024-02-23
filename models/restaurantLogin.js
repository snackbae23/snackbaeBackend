const mongoose = require("mongoose");

const resLogin = new mongoose.Schema({
    details : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"RestaurantDetails",
    },
    username : {
        type:String,
        // required:true,
    },
    password:{
        type:String,
        // required:true,
    },
    menu:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"AddMenu"
    }]
});

const RestaurantLogin = mongoose.model("RestaurantLogin",resLogin);
module.exports = RestaurantLogin;