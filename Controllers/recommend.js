const express = require("express");
const User = require("../models/User")
const RestaurantDetails = require("../models/restaurantDetails");
const AddMenu = require("../models/AddMenu");


const recommendedRes = async (req, res) => {
    try {
        const { userId, restaurantId } = req.params;

        let restaurant = await RestaurantDetails.findById({ _id: restaurantId });

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        if (!restaurant.recommendations.includes(userId)) {
            await RestaurantDetails.findOneAndUpdate(
                { _id: restaurantId },
                { $push: { recommendations: userId } },
                { new: true }
            );

            await User.findByIdAndUpdate(
                userId,
                { $push: { recommendedRestaurants: restaurantId } },
                { new: true }
            );

            return res.status(200).json({ message: "Recommendation added successfully" });
        }
        else {
            return res.status(400).json({ error: "Recommendation already exists" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const unrecommendedRes = async (req, res) => {
    try {
        const { userId, restaurantId } = req.params;

        let restaurant = await RestaurantDetails.findOne({ _id: restaurantId });
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }

        if (restaurant.recommendations.includes(userId)) {
            await RestaurantDetails.findOneAndUpdate(
                { _id: restaurantId },
                { $pull: { recommendations: userId } },
                { new: true }
            );

            await User.findByIdAndUpdate(
                userId,
                { $pull: { recommendedRestaurants: restaurantId } },
                { new: true }
            );

            return res.status(200).json({ message: "Recommendation deleted successfully" });
        }
        else {
            return res.status(400).json({ error: "Recommendation not found" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const recommendedMenu = async (req, res) => {
    try {
        const { userId, menuId } = req.params;

        let menu = await AddMenu.findById(menuId);

        if (!menu) {
            return res.status(404).json({ error: "Menu not found" });
        }

        if (!menu.users.includes(userId)) {
            await AddMenu.findByIdAndUpdate(
                menuId,
                { $push: { users: userId } },
                { new: true }
            );

            await User.findByIdAndUpdate(
                userId,
                { $push: { recommendedMenu: menuId } },
                { new: true }
            );

            return res.status(200).json({ message: "Recommendation Menu added successfully" });

        } else {
            return res.status(400).json({ error: "Recommendation Menu already exists" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


const unrecommendedMenu = async (req, res) => {
    try {
        const { userId, menuId } = req.params;

        let menu = await AddMenu.findById(menuId);

        if (!menu) {
            return res.status(404).json({ error: "Menu not found" });
        }

        if (menu.users.includes(userId)) {
            await AddMenu.findByIdAndUpdate(
                menuId,
                { $pull: { users: userId } },
                { new: true }
            );

            await User.findByIdAndUpdate(
                userId,
                { $pull: { recommendedMenu: menuId } },
                { new: true }
            );

            return res.status(200).json({ message: "Recommendation Menu deleted successfully" });

        }
        else {
            return res.status(400).json({ error: "Recommendation not found" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    recommendedRes,
    unrecommendedRes,
    recommendedMenu,
    unrecommendedMenu
};