const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

// Only admins or podcast creators can access analytics
router.get(
  "/podcast/:podcastId",
  authMiddleware,
  roleMiddleware(["creator", "admin"]),
  analyticsController.getPodcastAnalytics
);

module.exports = router;
