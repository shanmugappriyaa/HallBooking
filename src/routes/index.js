const express = require("express");
const router = express.Router();

const roomRoutes = require("./rooms");
const bookingRoutes = require("./booking");
const customerRoutes = require("./customer");

router.use("/rooms", roomRoutes);
router.use("/customers", customerRoutes);
router.use("/booking", bookingRoutes);

module.exports = router;
