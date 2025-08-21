const express = require("express");
const { roleValidator, userValidator } = require("../middlewares/userValidator");
const { register, login } = require("../controllers/userControllers");
const userRouter = express.Router();
userRouter.post("/register",userValidator ,roleValidator,register);
userRouter.post("/login",login);
module.exports = userRouter;