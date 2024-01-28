const dotenv = require("dotenv");
const express = require("express");
const { dbconnect } = require("./config/dbconnect");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const becomePartnerRoute = require("./routes/becomePartner");
const userRoute = require("./routes/User");
const PORT = process.env.PORT || 4000;

//database connect
dbconnect();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", becomePartnerRoute);
app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
})
