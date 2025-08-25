const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

// =====================
// AUTH ROUTES
// =====================

// Register a new user
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Forgot password (sends reset link via email)
router.post("/forgot-password", authController.forgotPassword);

// Reset password (token in query, new password in body)
router.post("/reset-password", authController.resetPassword);

// Get current logged-in user (requires token)
router.post("/me", authMiddleware, authController.me);

module.exports = router;
