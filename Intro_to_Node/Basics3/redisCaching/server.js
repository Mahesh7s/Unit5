const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('redis');

const app = express();
app.use(bodyParser.json());

// Redis Client
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Simulated Database (in-memory array)
let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' }
];

// Cache key
const CACHE_KEY = 'items:all';

// Middleware to check cache
async function checkCache(req, res, next) {
  try {
    const cachedData = await redisClient.get(CACHE_KEY);
    if (cachedData) {
      console.log('✅ Cache Hit');
      return res.status(200).json(JSON.parse(cachedData));
    }
    console.log('❌ Cache Miss');
    next();
  } catch (err) {
    console.error(err);
    next();
  }
}

// GET /items - Fetch all items
app.get('/items', checkCache, async (req, res) => {
  // Simulating DB fetch
  const data = items;

  // Save to Redis with TTL of 60 seconds
  await redisClient.set(CACHE_KEY, JSON.stringify(data), { EX: 60 });

  res.status(200).json(data);
});

// POST /items - Add new item and invalidate cache
app.post('/items', async (req, res) => {
  const { name } = req.body;
  const newItem = { id: items.length + 1, name };
  items.push(newItem);

  // Invalidate cache
  await redisClient.del(CACHE_KEY);
  console.log('🗑️ Cache Cleared after POST');

  res.status(201).json(newItem);
});

// PUT /items/:id - Update item and invalidate cache
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const itemIndex = items.findIndex(i => i.id == id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items[itemIndex].name = name;

  // Invalidate cache
  await redisClient.del(CACHE_KEY);
  console.log('🗑️ Cache Cleared after PUT');

  res.status(200).json(items[itemIndex]);
});

// DELETE /items/:id - Delete item and invalidate cache
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex(i => i.id == id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  const deletedItem = items.splice(itemIndex, 1);

  // Invalidate cache
  await redisClient.del(CACHE_KEY);
  console.log('🗑️ Cache Cleared after DELETE');

  res.status(200).json({ message: 'Item deleted', deletedItem });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
