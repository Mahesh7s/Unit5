const express = require("express");
const { subscribe, unsubscribe } = require("../controllers/subscriptionController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Subscribe to a podcast
router.post("/subscribe", authMiddleware, subscribe);

// Unsubscribe from a podcast
router.post("/unsubscribe", authMiddleware, unsubscribe);

module.exports = router;
