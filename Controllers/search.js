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
    .exec()
  res.send(users);
};

module.exports = {
  allrestaurantDetails,
};