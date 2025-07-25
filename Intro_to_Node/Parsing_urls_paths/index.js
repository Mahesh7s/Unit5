const express = require("express");
const getInfo = require("./fileInfo");
const app = express();

app.get("/test",(req,res)=>{
	res.send("Test Route is Working!")
})

app.get("/fileinfo", (req, res) => {
  const { filepath } = req.query;

  if (!filepath) {
    return res.status(400).json({ error: "Missing 'filepath' query parameter" });
  }

  try {
    const info = getFileInfo(filepath);
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: "Failed to parse filepath" });
  }
});
app.get("/parseurl", (req, res) => {
  const { url: urlParam } = req.query;

  if (!urlParam) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    const result = parseURL(urlParam);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Invalid URL" });
  }
});



app.listen(7000,()=>{
	console.log("App is workig on the port 7000");
})