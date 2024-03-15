const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    amount: { type: Number, required: true, default: 0 }, // Default value set to 0
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RestaurantDetails",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    // You can include additional fields like payment method, payment date, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
