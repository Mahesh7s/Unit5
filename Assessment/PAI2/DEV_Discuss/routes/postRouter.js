const express = require("express");

const { addPost, getPosts, getPostByid } = require("../controllers/postControllers");
const { authMid } = require("../middlewares/authMiddleware");
const postRouter = express.Router();
postRouter.post("/addPost",authMid(["User","Moderator"]),addPost)
postRouter.post("/getPosts",authMid(["User","Moderator"]),getPosts)
postRouter.post("/getPostById/:id",authMid(["Moderator"]),getPostByid);
module.exports = postRouter;