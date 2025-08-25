const Podcast = require("../models/podcastModel");
const cloudinary = require("cloudinary").v2;

// =====================
// Cloudinary Config
// =====================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// =====================
// Create a new Podcast
// =====================
exports.createPodcast = async (req, res) => {
  try {
    const { title, description, coverImage } = req.body;
    if (!title) return res.status(400).json({ ok: false, message: "Title is required" });

    let coverImageUrl = "";
    if (coverImage) {
      const result = await cloudinary.uploader.upload(coverImage, { folder: "podcasts/covers" });
      coverImageUrl = result.secure_url;
    }

    const podcast = await Podcast.create({
      title,
      description,
      creatorId: req.user.userId,
      coverImageUrl
    });

    res.status(201).json({ ok: true, message: "Podcast created", podcast });
  } catch (err) {
    console.error("createPodcast error:", err);
    res.status(500).json({ ok: false, message: "Server error", error: err.message });
  }
};

// =====================
// Get all Podcasts
// =====================
exports.getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find().sort({ createdAt: -1 });
    res.status(200).json({ ok: true, podcasts });
  } catch (err) {
    console.error("getAllPodcasts error:", err);
    res.status(500).json({ ok: false, message: "Server error", error: err.message });
  }
};

// =====================
// Delete a Podcast
// =====================
exports.deletePodcast = async (req, res) => {
  try {
    const { id } = req.params;
    const podcast = await Podcast.findById(id);
    if (!podcast) return res.status(404).json({ ok: false, message: "Podcast not found" });

    await Podcast.findByIdAndDelete(id);
    res.status(200).json({ ok: true, message: "Podcast deleted successfully" });
  } catch (err) {
    console.error("deletePodcast error:", err);
    res.status(500).json({ ok: false, message: "Server error", error: err.message });
  }
};
