const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");

// =====================
// Add a Comment (listeners, creators, admins)
// =====================
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["listener", "creator", "admin"]),
  commentController.addComment
);

// =====================
// Get Comments for an Episode (public)
// =====================
router.get("/episode/:episodeId", commentController.getComments);

// =====================
// Moderate Comment (approve/reject) (creator/admin only)
// =====================
router.patch(
  "/:commentId/moderate",
  authMiddleware,
  roleMiddleware(["creator", "admin"]),
  commentController.moderateComment
);

// =====================
// Delete Comment (owner/admin/moderator)
// =====================
router.delete(
  "/:commentId",
  authMiddleware,
  commentController.deleteComment
);

module.exports = router;
