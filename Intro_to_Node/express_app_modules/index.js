const express =  require("express");
const readData = require("./read");
const os = require("os");
const dns = require("dns")


const app = express();

app.get("/test",(req,res)=>{
	res.send("Test route is working!");
})
app.get("/",(req,res)=>{
	res.send("WELCOME TO / Page")
})
app.get("/systemdetails",(req,res)=>{

	let data = {
		platform:os.platform(),
		totalMemory: (os.totalmem() / (1024 ** 3)).toFixed(2) + " GB",
    freeMemory: (os.freemem() / (1024 ** 3)).toFixed(2) + " GB",
    cpuModel: os.cpus()[0].model,
    cpuCores: os.cpus().length


	}
	res.send(data)

})
app.get("/getip",(req,res)=>{

	dns.lookup("masaischool.com", { all: true }, (err, addresses) => {
    if (err) return res.status(500).send("DNS resolution failed");

    const result = {
      hostname: "masaischool.com",
      ipAddresses: addresses.map(addr => addr.address)
    };
    res.json(result);
  });

})

app.get("/readfile", (req, res) => {
  readData((err, data) => {
    if (err) return res.status(500).send("Error reading file.");
    res.send(data); // This sends the content of the file to the browser
  });
});


app.listen(7777,()=>{
	console.log("App is running on the port 7777");
})
