const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getProfile,
    updateProfile,
} = require("../controllers/authController");

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

module.exports = router;