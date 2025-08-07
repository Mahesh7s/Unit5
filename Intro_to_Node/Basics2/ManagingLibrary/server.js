const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const memberRoutes = require("./routes/memberRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
connectDB();

app.use(bodyParser.json());
app.use("/api", memberRoutes);
app.use("/api", bookRoutes);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
