const multer = require("multer");
const cloudinary = require("../config/cloudinary"); // your config file
const Episode = require("../models/episodeModel");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const Subscription = require("../models/subscriptionModel");
const { sendEmail } = require("../utils/emailService");

// =====================
// Create Episode (Admin/Creator only)
// =====================
const createEpisode = async (req, res) => {
  try {
    const { podcastId, title, description, audioUrl, publicId, duration } = req.body;

    // Validate required fields
    if (!podcastId || !title || !audioUrl || !publicId || !duration) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Validate duration
    if (duration < 1 || duration > 180) {
      return res.status(400).json({ message: "Duration must be between 1 and 180 minutes" });
    }

    // Create episode
    const episode = await Episode.create({ podcastId, title, description, audioUrl, publicId, duration });

    // Notify active subscribers
    const subscribers = await Subscription.find({ podcastId, status: "active" }).populate("userId", "email");
    subscribers.forEach(sub => {
      if (sub.userId?.email) {
        sendEmail({
          to: sub.userId.email,
          subject: "New Episode Available!",
          text: `A new episode "${title}" has been released. Check it out now!`,
        });
      }
    });

    return res.status(201).json({ message: "Episode created successfully", episode });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating episode", error: error.message });
  }
};

// =====================
// Get Episodes by Podcast (Public)
// =====================
const getEpisodesByPodcast = async (req, res) => {
  try {
    const { podcastId } = req.params;
    const episodes = await Episode.find({ podcastId }).sort({ createdAt: -1 });
    return res.status(200).json(episodes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching episodes", error: error.message });
  }
};

// =====================
// Delete Episode (Admin/Creator only)
// =====================
const deleteEpisode = async (req, res) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findByIdAndDelete(id);

    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }

    // TODO: Delete from Cloudinary using publicId

    return res.status(200).json({ message: "Episode deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting episode", error: error.message });
  }
};
// src/controllers/episodeController.js
const uploadEpisode = async (req, res) => {
  try {
    const { title, podcastId, duration } = req.body;

    if (!req.file) return res.status(400).json({ message: "Audio file required" });

    // Upload to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "video" }, // Cloudinary treats audio as video
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(fileBuffer);
      });
    };

    const result = await streamUpload(req.file.buffer);

    // Save Episode to DB
    const episode = await Episode.create({
      podcastId,
      title,
      audioUrl: result.secure_url,
      duration,
    });

    res.status(201).json({
      message: "Episode uploaded successfully",
      episode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

module.exports = { uploadEpisode };

module.exports = {
  createEpisode,
  getEpisodesByPodcast,
  deleteEpisode,
  uploadEpisode
};
