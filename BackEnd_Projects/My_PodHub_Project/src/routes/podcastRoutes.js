const express = require("express");
const router = express.Router();
const podcastController = require("../controllers/podcastController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

// =====================
// Podcast Routes
// =====================

// Create a new podcast (creator or admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["creator", "admin"]),
  podcastController.createPodcast
);

// Get all podcasts (public)
router.get("/", podcastController.getAllPodcasts);

// Delete a podcast (creator or admin only)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["creator", "admin"]),
  podcastController.deletePodcast
);

// =====================
// NOTE: Episode-related routes are handled separately in episodeRoutes.js
// =====================

module.exports = router;
