const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");

console.log("CART ROUTES LOADED");

router.get("/test", (req, res) => {
  res.send("Cart route works");
});

// Protected Routes
router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/:id", authMiddleware, updateCart);
router.delete("/:id", authMiddleware, removeFromCart);

module.exports = router;