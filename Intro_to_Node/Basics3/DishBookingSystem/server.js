const mongoose = require("mongoose");
const express = require("express");
const connectToDB = require("./configs/db");
const userRouter = require("./routes/userRoutes");
const dishRouter = require("./routes/dishRoutes");
const orderRouter = require("./routes/orderRoutes");
const app = express();
app.use(express.json());
connectToDB()

app.get("/test",(req,res)=>{
	res.status(200).json({message:"App is teking"});




})

app.use("/users",userRouter);
app.use("/dishes",dishRouter);
app.use("/orders",orderRouter);




app.use((req,res)=>{
	res.status(404).json({Error:"Route is not defined!!1"});
})

app.listen(7000,()=>{
	console.log("App is working on the route 7000")
})

