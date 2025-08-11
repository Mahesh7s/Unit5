const express = require("express");
const { addGame, getGames, getGamebyId, updateGameById, deleteGame } = require("../controllers/gameControllers");
const genreValidation = require("../Middlewares/genreValidation");
const requestMdle = require("../Middlewares/requestMiddleWares");
const gameRouter = express.Router();
gameRouter.post("/addGame",genreValidation, requestMdle,addGame);
gameRouter.get("/getGames",requestMdle,getGames)
gameRouter.get("/getGameById/:id",requestMdle,getGamebyId);
gameRouter.put("/updateGameById/:id",requestMdle,updateGameById);
gameRouter.delete("/deleteGame/:id",requestMdle, deleteGame);
module.exports = gameRouter;