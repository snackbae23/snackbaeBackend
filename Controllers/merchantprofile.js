const RestaurantDetails = require("../models/restaurantDetails");


const merchantprofile = async (req, res) => {
  const restaurantId = req.params.restaurantId;
  const updates = req.body;

  try {
    // Log the received data for debugging
    //console.log("Received Data:", updates);

    // Find the restaurant details by restaurantId
    let restaurantInfo = await RestaurantDetails.findOne({
      resturantId: restaurantId,
    });

    // If restaurant details not found, return 404 Not Found
    if (!restaurantInfo) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Update the restaurant details with the provided updates
    restaurantInfo = await RestaurantDetails.findOneAndUpdate(
      { resturantId: restaurantId },
      updates,
      { new: true }
    );

    //console.log("Updated Data:", restaurantInfo);

    return res.status(200).json({
      message: "Restaurant details updated successfully",
      data: restaurantInfo,
    });
  } catch (error) {
    console.error("Error updating restaurant details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { merchantprofile };
