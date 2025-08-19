// src/jobs/bulkInsertJob.js
const cron = require("node-cron");
const redis = require("../config/redis");
const Book = require("../models/bookModel");

cron.schedule("*/2 * * * *", async () => {
  const keys = await redis.keys("bulk_books:*");
  
  for (let key of keys) {
    const userId = key.split(":")[1];
    const bulkData = await redis.lrange(key, 0, -1);
    
    if (bulkData.length > 0) {
      const books = bulkData.flatMap(item => JSON.parse(item));
      await Book.insertMany(books.map(b => ({ ...b, userId })));
      await redis.del(key);
      await redis.del(`books:${userId}`); // invalidate cache
    }
  }
});
