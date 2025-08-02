const express = require("express");
const mongoose = require("mongoose");
const { getAllUsers, addUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/getAllUsers",getAllUsers);
userRouter.post("/addUser",addUser)


module.exports =userRouter;