const express = require("express");
const router = express.Router();
const episodeController = require("../controllers/episodeController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");



const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/upload",
  authMiddleware,              // verify JWT first
  roleMiddleware(["creator"]), // only creators can upload
  upload.single("audio"),
  episodeController.uploadEpisode
);





// =====================
// Create Episode (Admin/Creator only)
// =====================
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "creator"]),
  episodeController.createEpisode
);

// =====================
// Get Episodes for a Podcast (Public)
// =====================
router.get("/:podcastId", episodeController.getEpisodesByPodcast);

// =====================
// Delete Episode (Admin/Creator only)
// =====================
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "creator"]),
  episodeController.deleteEpisode
);

module.exports = router;
