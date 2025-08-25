const Episode = require("../models/episodeModel");
const Comment = require("../models/Comment");
const Podcast = require("../models/podcastModel");
const Subscription = require("../models/subscriptionModel");

// Get Analytics for a Podcast
exports.getPodcastAnalytics = async (req, res) => {
  try {
    const { podcastId } = req.params;

    // Check if podcast exists
    const podcast = await Podcast.findById(podcastId);
    if (!podcast) return res.status(404).json({ ok: false, message: "Podcast not found" });

    // Episodes of this podcast
    const episodes = await Episode.find({ podcastId });

    // Total plays
    const totalPlays = episodes.reduce((sum, ep) => sum + ep.plays, 0);

    // Total comments
    const episodeIds = episodes.map(ep => ep._id);
    const totalComments = await Comment.countDocuments({ episodeId: { $in: episodeIds } });

    // Total subscriptions (if Subscription model exists)
    const totalSubscriptions = await Subscription.countDocuments({ podcastId });

    res.json({
      ok: true,
      analytics: {
        totalEpisodes: episodes.length,
        totalPlays,
        totalComments,
        totalSubscriptions
      }
    });
  } catch (err) {
    console.error("getPodcastAnalytics error:", err);
    res.status(500).json({ ok: false, message: "Server error", error: err.message });
  }
};
