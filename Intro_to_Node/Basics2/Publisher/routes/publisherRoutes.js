const express = require("express");
const { addPublisher, getPublishers, getPublisherById, updatePublisher, deletePublisher, getAllGamesByPublisherId } = require("../controllers/publisherController");
const requestMdle = require("../Middlewares/requestMiddleWares");
const publisherRouter = express.Router();
publisherRouter.post("/addPublisher", requestMdle,addPublisher);
publisherRouter.get("/getPublishers",requestMdle,getPublishers);
publisherRouter.get("/getPublisherById/:id",requestMdle,getPublisherById);
publisherRouter.put("/updatePublisher/:id",requestMdle,updatePublisher)
publisherRouter.delete("/deletePublisher/:id",requestMdle,deletePublisher);
publisherRouter.get("/getAllGamesByPublisherId/:id",requestMdle, getAllGamesByPublisherId);
module.exports = publisherRouter;
