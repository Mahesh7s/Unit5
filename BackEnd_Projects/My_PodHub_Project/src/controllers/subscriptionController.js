const Subscription = require("../models/subscriptionModel");
const Podcast = require("../models/podcastModel");
const Episode = require("../models/episodeModel");
const { sendEmail } = require("../utils/emailService");

// =====================
// Subscribe to a Podcast
// =====================
exports.subscribe = async (req, res) => {
  try {
    const { podcastId } = req.body;
    const userId = req.user.userId;

    const podcast = await Podcast.findById(podcastId);
    if (!podcast) return res.status(404).json({ ok: false, message: "Podcast not found" });

    const subscription = await Subscription.create({ podcastId, userId });

    res.status(201).json({ ok: true, message: "Subscribed successfully", subscription });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ ok: false, message: "Already subscribed" });
    }
    console.error("subscribe error:", err);
    res.status(500).json({ ok: false, message: "Server error", error: err.message });
  }
};

// =====================
// Unsubscribe from a Podcast
// =====================
exports.unsubscribe = async (req, res) => {
  try {
    const { podcastId } = req.body;
    const userId = req.user.userId;

    const result = await Subscription.findOneAndDelete({ podcastId, userId });
    if (!result) return res.status(404).json({ ok: false, message: "Subscription not found" });

    res.json({ ok: true, message: "Unsubscribed successfully" });
  } catch (err) {
    console.error("unsubscribe error:", err);
    res.status(500).json({ ok: false, message: "Server error", error: err.message });
  }
};

// =====================
// Notify Subscribers on New Episode
// =====================
exports.notifySubscribers = async (episode) => {
  try {
    const subscribers = await Subscription.find({ podcastId: episode.podcastId })
      .populate("userId", "email name");
    if (!subscribers.length) return;

    const podcast = await Podcast.findById(episode.podcastId);

    for (const sub of subscribers) {
      const email = sub.userId.email;
      const name = sub.userId.name;

      await sendEmail({
        to: email,
        subject: `New Episode: ${episode.title}`,
        html: `<p>Hello <b>${name}</b>,</p>
               <p>A new episode has been uploaded to the podcast <b>${podcast.title}</b>:</p>
               <p>Episode Title: ${episode.title}</p>
               <p>Description: ${episode.description}</p>`
      });
    }
  } catch (err) {
    console.error("notifySubscribers error:", err);
  }
};
