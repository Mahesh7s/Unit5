const mongoose = require("mongoose");
const express = require("express");
const connectToDB = require("./configs/database");
const publisherRouter = require("./routes/publisherRoutes");
const gameRouter = require("./routes/gameRoutes");
const app = express();
app.use(express.json());
connectToDB()

app.get("/testRoute",(req,res)=>{
	res.status(200).json({message:"App is testinning"});

})
app.use("/Publishers", publisherRouter);
app.use("/Games",gameRouter);




app.use((req,res)=>{
	res.status(404).json({Error:"Route is not defined!!1"});
})

app.listen(7000,()=>{
	console.log("App is working on the route 7000")
})




