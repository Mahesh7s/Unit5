const Comment = require("../models/Comment");
const Episode = require("../models/episodeModel");

// ✅ Add a Comment
exports.addComment = async (req, res) => {
  try {
    const { episodeId, content } = req.body;
    const userId = req.user.userId;

    if (!episodeId || !content) {
      return res.status(400).json({ ok: false, message: "Episode ID and content are required" });
    }

    // Check if episode exists
    const episode = await Episode.findById(episodeId);
    if (!episode) {
      return res.status(404).json({ ok: false, message: "Episode not found" });
    }

    const comment = await Comment.create({
      episodeId,
      userId,
      content: content.trim(),
      isApproved: true // change to false if you want moderation workflow
    });

    res.status(201).json({ ok: true, message: "Comment added successfully", comment });
  } catch (err) {
    console.error("addComment error:", err);
    res.status(500).json({ ok: false, message: "Server error", error: err.message });
  }
};

// ✅ Get Comments for an Episode
exports.getComments = async (req, res) => {
  try {
    const { episodeId } = req.params;

    const comments = await Comment.find({ episodeId, isApproved: true })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({ ok: true, comments });
  } catch (err) {
    console.error("getComments error:", err);
    res.status(500).json({ ok: false, message: "Server error", error: err.message });
  }
};

// ✅ Moderate Comment (Approve / Reject)
exports.moderateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { isApproved } = req.body;

    if (!req.user.role || !["admin", "moderator"].includes(req.user.role)) {
      return res.status(403).json({ ok: false, message: "Unauthorized: Only admins/moderators can moderate comments" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ ok: false, message: "Comment not found" });
    }

    comment.isApproved = isApproved;
    await comment.save();

    res.json({ ok: true, message: `Comment ${isApproved ? "approved" : "rejected"}`, comment });
  } catch (err) {
    console.error("moderateComment error:", err);
    res.status(500).json({ ok: false, message: "Server error", error: err.message });
  }
};

// ✅ Delete Comment (Optional - useful for moderation)
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ ok: false, message: "Comment not found" });
    }

    // Only admin, moderator, or comment owner can delete
    if (req.user.role !== "admin" && req.user.role !== "moderator" && comment.userId.toString() !== req.user.userId) {
      return res.status(403).json({ ok: false, message: "Unauthorized: You cannot delete this comment" });
    }

    await comment.deleteOne();

    res.json({ ok: true, message: "Comment deleted successfully" });
  } catch (err) {
    console.error("deleteComment error:", err);
    res.status(500).json({ ok: false, message: "Server error", error: err.message });
  }
};
