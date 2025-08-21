const mongoose = require("mongoose");
require("dotenv").config()
const express = require("express");
const connectDatabase = require("./configs/database");
const userRouter = require("./routes/userRoutes");
const tagRouter = require("./routes/tagRouter");
const postRouter = require("./routes/postRouter");
const { logger } = require("./middlewares/logger");
const app = express();
app.use(express.json());
connectDatabase();
app.use(logger);
app.get("/test",(req,res)=>{
	res.status(200).json({message:"App is testing"});

})

app.use("/users",userRouter);
app.use("/tags",tagRouter);
app.use("/posts",postRouter);


app.use((req,res)=>{
	res.status(404).json({Error:"Route is not defined!!1"});
})

app.listen(process.env.PORT,()=>{
	console.log(`App is running on the Port :${process.env.PORT}`);
})

