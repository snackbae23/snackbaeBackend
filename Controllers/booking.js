const Bookings = require("../models/bookingmodel");
const mailSender = require("../util/mailSender");
const User =require("../models/User")
const restaurantDetails = require("../models/restaurantDetails");
const {
  bookingConfirmationEmail,
  editBookingConfirmationEmail,
} = require("../mail/template/bookingConfirmationEmail");

//////////////////////
// GET ALL BOOKINGS //
//////////////////////
// const getBookings = async (req, res) => {
//   const bookings = await Bookings.find().populate("guest");
//   res.status(200).json(bookings);
// };


//////////////////
// SAVE BOOKING //
//////////////////
const createBooking = async (req, res) => {
  try {
    // Extract data from request body
    const { date, time, numofpeople,occassion } = req.body;

    // Extract user ID and restaurant ID from URL parameters
    const { userId, restaurantId } = req.params;

    // Check if the restaurant exists
    let restaurant = await restaurantDetails.findOne({_id:restaurantId});
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Create a new booking
    const booking = new Bookings({
      user: userId,
      resturant: restaurantId,
      date,
      time,
      numofpeople,
      occassion,
    });

    // Save the booking to the database
    await booking.save();

    // Update restaurant details to include the booking and return the modified document
    restaurant = await restaurantDetails.findByIdAndUpdate(
      restaurantId,
      { $push: { bookings: booking._id } },
      { new: true }
    );

    // Fetch user's profile including email and name
    const user = await User.findById(userId).populate("additionalDetails");
    const userProfile = user.additionalDetails;
    const customerName = userProfile.fullName;
    const userEmail = userProfile.email;


    // Send email notification to user
    const mail = await mailSender(
      userEmail,
      "Booking Confirmation",
      bookingConfirmationEmail(customerName, date, time, numofpeople)
    );

    // Return success response
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//////////////////
// EDIT BOOKING //
//////////////////
const editBooking = async (req, res) => {
  try {
    // Extract data from request body
    const { date, time, numofpeople } = req.body;
    const { bookingId } = req.params;

    // Find the booking to be updated
    let booking = await Bookings.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update the booking
    booking.date = date;
    booking.time = time;
    booking.numofpeople = numofpeople;
    await booking.save();

    // Find the restaurant details

    // Fetch user's profile including email and name
    const user = await User.findById(booking.user).populate(
      "additionalDetails"
    );
    const userEmail = user.additionalDetails.email;
    const customerName = user.additionalDetails.fullName;

    // Send email notification to user
    const mail = await mailSender(
      userEmail,
      "Booking Update Confirmation",
      editBookingConfirmationEmail(customerName, date, time, numofpeople)
    );

    // Return success response
    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

////////////////////
// DELETE BOOKING //
////////////////////
const deleteBooking = async (req, res) => {
  try {
    // Extract booking ID from URL parameters
    const { bookingId } = req.params;

    // Check if the booking exists
    const booking = await Bookings.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Delete the booking from the database
    await Bookings.findByIdAndDelete(bookingId);

    // Return success response
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllBookingsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

  const bookings = await Bookings.find({ resturant: restaurantId }).populate({
    path: "user",
    populate: {
      path: "additionalDetails",
      select: "fullName email", // Select the fields you want to populate
    },
  });

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ error: "No bookings found for this restaurant" });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error retrieving bookings for restaurant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getAllBookingsByRestaurantByDate = async (req, res) => {
  try {
    const { restaurantId,date } = req.params;
    const d = new Date(date);

    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const day1 = day < 10 ? '0' + day : day;
    const month1 = month < 10 ? '0' + month : month;

    const dd = day1+'-'+month1+'-'+year;

    // const startOfDay = new Date(year, month - 1, day);
    // const endOfDay = new Date(year, month - 1, day + 1);

  const bookings = await Bookings.find({ resturant: restaurantId ,date: dd}).populate({
    path: "user",
    populate: {
      path: "additionalDetails",
      select: "fullName email image", // Select the fields you want to populate
    },
  });

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ error: "No bookings found for this restaurant" });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error retrieving bookings for restaurant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//////////////////////
// GET AVAILABILITY //
//////////////////////
// const searchAvailability = async (req, res) => {
//   const { date, time, amount, tables } = req.body;

//   // Get all bookings from db
//   const allBookings = await Bookings.find().lean();

//   try {
//     // Get existing reservations from requested day
//     const requestedDate = allBookings.filter(
//       (booking) => booking.date === date
//     );
//     // If there are no reservations on requested date, confirm booking
//     if (requestedDate.length < 1) {
//       res.status(200).send(true);
//     } else {
//       /* If there are bookings on requested date,
//     check if there are any at the same time */
//       for (let i = 0; i < requestedDate.length; i++) {
//         // List of bookings on the same date and same time:
//         const sameDayAndTime = requestedDate.filter(
//           (booking) => booking.time === time
//         );
//         // If there are no bookings on requested time, confirm booking
//         if (sameDayAndTime.length < 1) {
//           res.status(200).send(true);
//         } else {
//           // Get list of bookings with same date & time:
//           for (let j = 0; j < sameDayAndTime.length; j++) {
//             // Get total amount of booked tables on same date & time
//             const bookedTables = sameDayAndTime.reduce(function (a, b) {
//               return a + b.tables;
//             }, 0);
//             // If 15 tables are already booked, decline booking request
//             if (bookedTables + tables > 15) {
//               res.status(200).send(false);
//             } // If there are tables available, confirm booking
//             else {
//               res.status(200).send(true);
//             }
//           }
//         }
//       }
//     }
//   } catch (error) {
//     res.status(400);
//   }
// };

////////////////////////
// EMAIL CANCELLATION //
////////////////////////
// const emailCancellation = async (req, res) => {
//   const id = req.params.id;

//   try {
//     // Find booking in db and delete
//     await Bookings.findById(id).deleteOne();
//     res.status(200);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


module.exports = {
  getAllBookingsByRestaurant,
  createBooking,
  editBooking,
  deleteBooking,
  getAllBookingsByRestaurantByDate,
};
