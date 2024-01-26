const mongoose = require('mongoose');

const resDetails = new mongoose.Schema({
    restaurantName: {
        type: String,
        // required: true,
    },
    cuisineType: {
        type: String,
        // required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    pocContact: {
        type: String,
        // required: true,
    },
    email : {
        type: String,
        // required: true,
    },
    contactPerson: {
        type: String,
        // required: true,
    },
    openingHour: {
        type: String,
        // required: true,
    },
    closingHour: {
        type: String,
        // required: true,
    },
    reservationPolicy: {
        type: String,
        // required: true,
    },
    ambienceDescription: {
        type: String,
        // required: true,
    },
    capacity: {
        type: Number,
        // required: true,
    },
    numberOfTables: {
        type: Number,
        // required: true,
    },
    specialties: {
        type: String,
        // required: true,
    },
    currentPromotions: {
        type: String,
        // required: true,
    },
    dietaryRestrictions: {
        type: String,
        // required: true,
    },
    preferredPaymentMethod: {
        type: String,
        // required: true,
    },
    specialties1: {
        type: String,
        // required: true,
    },
    currentPromotion: {
        type: String,
        // required: true,
    },
    agree: {
        type: String,
        // required: true,
    }
    // login:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"RestaurantLogin",
    // }
});

const RestaurantDetails = mongoose.model("RestaurantDetails",resDetails);
module.exports = RestaurantDetails;