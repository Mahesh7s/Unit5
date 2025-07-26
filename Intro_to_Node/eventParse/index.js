const express = require("express");
const logger = require("./eventLogger");
const delayMessage = require("./delay") 

const app = express();

app.get("/test1",(req,res)=>{
	 
  res.json("Test route is working");
})

app.get("/emit", (req, res) => {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ error: "Missing 'message' query parameter" });
  }

  logger.emit("log", message);
  const timestamp = new Date().toISOString();

  res.json({
    status: "Event logged",
    timestamp,
  });
});

// Route: /delay?message=Wait&time=2000
app.get("/delay", async (req, res) => {
  const { message, time } = req.query;

  if (!message || !time) {
    return res.status(400).json({ error: "Missing 'message' or 'time' query parameter" });
  }

  try {
    const result = await delayMessage(message, time);
    res.json({
      message: result,
      delay: `${time}ms`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



app.listen(7000,()=>{
	console.log("Working on Port 7000");
})