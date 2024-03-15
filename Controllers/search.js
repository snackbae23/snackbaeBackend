const restaurantDetails = require("../models/restaurantDetails");

const allrestaurantDetails = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { restaurantName: { $regex: req.query.search, $options: "i" } },
          { resturantId: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await restaurantDetails
    .find(keyword)
    .populate("menu")
    .populate("payoutmethod")
    .exec();
  res.send(users);
};

const restaurantDetailsByName = async (req, res) => {
  const searchTerm = req.query.name;
  const restaurants = await restaurantDetails.find({
    restaurantName: { $regex: searchTerm, $options: "i" },
  });
  res.send(restaurants);
};

module.exports = {
  allrestaurantDetails,
  restaurantDetailsByName,
};
