// const shortid = require("shortid");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// const razorpay = new Razorpay({
//   key_id:"rzp_test_j3uMC3pJNVXJpR",
//   key_secret:"iVdd7vf9Qopo1TKflmLWF8Ue",
// });

// const verifyPaymentDetails = async (req, res) => {
//   //do a validation
//   const secret = "12345678";
//   console.log(req.body);
//   const shasum = crypto.createHmac("sha256", secret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");
//   console.log(digest, req.headers["x-razorpay-signature"]);
//   if (digest === req.headers["x-razorpay-signature"]) {
//     console.log("request is legit");
//     // process it
//     require("fs").writeFileSync(
//       "payment1.json",
//       JSON.stringify(req.body, null, 4)
//     );
//     try {
//       // const payment = await PaymentModel.create({
//       // tutor_id: tid,
//       // payment_id: razorpay_id,
//       // student_id: sid,
//       // service_used: service,
//       // amount: amount,
//       // });
//       res
//         .status(201)
//         .json({ message: "Payment created successfully", payment });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(500).json({ error: error.message });
//   }
//   res.json({ status: "ok" });
// };
// const performPayment = async (req, res) => {

//   const payment_capture = 1;
//   const amount = 499;
//   const currency = "INR";
//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: shortid.generate(),
//     payment_capture,
//   };
//   try {
//     const response = await razorpay.orders.create(options);
//     console.log(response);
//     res.json({
//       id: response.id,
//       currency: response.currency,
//       amount: response.amount,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = {
//   performPayment,
//   verifyPaymentDetails,
// };

const { instance } = require("../config/razorpayinstance");
const RestaurantDetails = require("../models/restaurantDetails");
const Payment = require("../models/paymentcontroller");
const shortid = require("shortid");
const crypto = require("crypto");
const User = require("../models/User");
// Function to capture the payment for a restaurant
exports.capturePaymentForRestaurant = async (req, res) => {
  try {
    //const { restaurantId } = req.params;
    const { amount } = req.body;
    console.log(req.body);

    // Find the restaurant details using the provided restaurant ID

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: shortid.generate(),
    };

    const order = await instance.orders.create(options);
    console.log(order);
    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error capturing payment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.verifyPaymentForRestaurant = async (req, res) => {
  console.log(req.body);
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.bodydata;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(200)
        .json({ success: false, message: "Payment Failed" });
    }
    const { id, amount, userId } = req.body.bodydata;

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Process further actions (e.g., update restaurant status, send confirmation emails, etc.)
      await savepayment(amount, id, userId, res);
      return res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      // Update payment status as failed in the database

      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const savepayment = async (amount, id, userId, res) => {
  // const restaurant = await RestaurantDetails.findOne({
  //   resturantId: restaurantId,
  // });

  // // If the restaurant is not found, return an error response
  // if (!restaurant) {
  //   return res
  //     .status(404)
  //     .json({ success: false, message: "Restaurant not found" });
  // }
  const payment = new Payment({
    amount: amount,
    restaurant_id: id,
    user: userId,
    
  });
  await payment.save();
  const reestaurant = await RestaurantDetails.findOneAndUpdate(
    { _id: id },
    { $push: { payments: payment._id } },
    { new: true } // Return the updated document
  );
};
exports.getAllPaymentsByRestaurantByDate = async (req, res) => {
   try {
     const { restaurantId, date } = req.params;
     const d = new Date(date);

     const day = d.getDate();
     const month = d.getMonth() + 1;
     const year = d.getFullYear();

     const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
       day < 10 ? "0" + day : day
     }`;

     const payments = await Payment.find({
       restaurant_id: restaurantId,
       createdAt: {
         $gte: formattedDate,
         $lt: new Date(d.getTime() + 86400000),
       },
     })
       .populate({
         path: "user",
         populate: {
           path: "additionalDetails",
           select: "fullName image", // Select the fields you want to include
         },
       })
       .exec();

     if (payments.length === 0) {
       return res.status(404).json({
         message: "No payments found for this restaurant on the specified date",
       });
     }

     res.status(200).json({ payments });
   } catch (error) {
     console.error("Error retrieving payments for restaurant:", error);
     res.status(500).json({ error: "Internal server error" });
   }
};
