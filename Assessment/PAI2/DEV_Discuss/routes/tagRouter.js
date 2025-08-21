const express = require("express");
const { addTag } = require("../controllers/tagControllers");
const tagRouter = express.Router();
tagRouter.post("/addTag",addTag)
module.exports = tagRouter;