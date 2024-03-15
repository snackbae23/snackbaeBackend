const express = require("express");
const router = express.Router();
const {merchantprofile}=require("../Controllers/merchantprofile")

router.put("/merchantprofile/:restaurantId", merchantprofile);

module.exports = router;
