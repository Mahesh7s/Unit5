const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const podcastRoutes = require("./routes/podcastRoutes");
const commentRoutes = require("./routes/commentRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const episodeRoutes = require("./routes/episodeRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

// =====================
// Middleware
// =====================
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

app.use(express.json());

// =====================
// Connect to MongoDB
// =====================
connectDB();

// =====================
// Routes
// =====================
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Working!!!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/episodes", episodeRoutes);
app.use("/api/analytics", analyticsRoutes);

// =====================
// 404 Handler
// =====================
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: `Route ${req.originalUrl} is not defined!`,
  });
});

// =====================
// Global Error Handler
// =====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    ok: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
