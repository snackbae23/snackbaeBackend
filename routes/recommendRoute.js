const express = require("express");
const router = express.Router();

const { recommendedRes, unrecommendedRes, recommendedMenu, unrecommendedMenu } = require("../Controllers/recommend");

router.post("/recommended/restaurant/:userId/:restaurantId", recommendedRes);
router.post("/unrecommended/restaurant/:userId/:restaurantId", unrecommendedRes);
router.post("/recommended/menu/:userId/:menuId", recommendedMenu);
router.post("/unrecommended/menu/:userId/:menuId", unrecommendedMenu);

module.exports = router;