const express = require("express");
const app = express();

app.get("/",(req,res)=>{
	res.send("Default page")
})

app.get("/home",(req,res)=>{
	res.json("This is home page");
})

app.get("/contact",(req,res)=>{
	res.send("ghttyryttf<h2>Contact us</h2>")
})
app.get("/about",(req,res)=>{
	res.json("Contact us at contact@contact.com:<h1>About Us </h1>")
})


app.listen(7777,()=>{
	console.log("This is 7777 port page,Server is running on http://localhost:3000")
	
})
