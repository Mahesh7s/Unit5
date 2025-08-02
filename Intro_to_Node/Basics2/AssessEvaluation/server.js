const express = require("express");
const mongoose = require("mongoose");
const connectToDatabase = require("./configs/db");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");

const app = express();
app.use(express.json());
connectToDatabase();
app.get("/test",(req,res)=>{
	res.status(200).json({msg:"Express testing route is working!"});

})
app.use("/products",productRouter)
app.use("/users",userRouter)
app.use("/orders",orderRouter)
app.listen(7000,()=>{
	console.log("App is working on the port 7000");
})