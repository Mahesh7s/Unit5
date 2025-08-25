// config/db.js
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB Connected");
    } catch (err) {
      retries += 1;
      console.error(`MongoDB connection error (attempt ${retries}):`, err.message);
      if (retries < maxRetries) {
        console.log("Retrying in 5 seconds...");
        setTimeout(connectWithRetry, 5000);
      } else {
        console.error("❌ Could not connect to MongoDB after multiple attempts. Exiting...");
        process.exit(1);
      }
    }
  };

  await connectWithRetry();
};

module.exports = connectDB;
