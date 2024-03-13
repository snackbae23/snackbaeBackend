const dotenv = require("dotenv");
const express = require("express");
const { dbconnect } = require("./config/dbconnect");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const becomePartnerRoute = require("./routes/becomePartner");
const userRoute = require("./routes/User")
const PORT = process.env.PORT || 4000;
const galleryRoute = require("./routes/gallery");
const merchantRoute = require("./routes/merchantprofile");
const menuRoute = require("./routes/menu");
const payoutRoute = require("./routes/payoutMethod");
 const generalRoute = require("./routes/generalinfo");
 const search = require("./routes/search")
 const bookingRoute = require("./routes/bookingRoute");
 const paymentRoute = require("./routes/paymentroute");
//database connect
dbconnect();

app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
app.use(cors());
app.use("/api",paymentRoute)
app.use("/api", bookingRoute)
app.use("/api", becomePartnerRoute);
app.use("/api", galleryRoute);
app.use("/api", menuRoute);
app.use("/api", payoutRoute);
app.use("/api", userRoute);
app.use("/api", generalRoute);
app.use("/api", search);
app.use("/api", merchantRoute);
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
})
