const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  placeOrder,
  getMyOrders,
  getOrderDetails,
} = require("../controllers/orderController");

router.post("/", authMiddleware, placeOrder);

router.get("/", authMiddleware, getMyOrders);

router.get("/:id", authMiddleware, getOrderDetails);

module.exports = router;