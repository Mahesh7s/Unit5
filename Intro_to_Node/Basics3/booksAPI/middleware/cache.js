// src/middleware/cache.js
const redis = require("../config/redis");

async function getBooksCache(req, res, next) {
  const userId = req.user.userId;
  const cacheKey = `books:${userId}`;
  const cachedData = await redis.get(cacheKey);
  
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  next();
}

module.exports = getBooksCache;
