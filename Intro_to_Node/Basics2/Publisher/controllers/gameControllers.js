const mongoose = require("mongoose");
const gameModel = require("../models/gameModel");
const publisherModel = require("../models/publisherModel");

const addGame = async(req,res)=>{
	try{
   let publisher = await publisherModel.findById(req.body.publisher);
   if(!publisher){
	return res.status(404).json({Error:"Publisher is not valid"});
   }
  
    publisher  = await gameModel.create(req.body);
   res.status(201).json({Message:"Game was added",publisher});

	}
	catch(err){
		res.status(404).json({Error:"Error in adding a Game",error:err.message});
	}
}


const getGames = async(req,res)=>{
	try{
       let Games = await gameModel.find().populate("publisher");
	   res.status(200).json({Message:"Games list",Games})
	}
	catch(err){
		res.status(404).json({Error:"Error occured in getting Games"});
	}
}

const getGamebyId = async(req,res)=>{
	const {id} = req.params;
	try{
          
		let game = await gameModel.findOne({"_id":id}).populate("publisher");;
		if(!game){
			return res.status(404).json({Error:"Game is not valid"});
		}
		res.status(200).json({Message:"Game with his publisher",game});
	}
	catch(err){
		res.status(404).json({Error:"Error in getting a game bu its id",error:err.message});
	}
}

const updateGameById = async(req,res)=>{
	const{id} = req.params;
	try{
        let game = await gameModel.findById(id);
		if(!game){
			return res.status(400).json({Error:"Game id is not valid"});

		}
		game = await gameModel.findByIdAndUpdate(id,req.body);
		res.status(200).json({MEssgae:"Game updated",game});
	}catch(err){
		res.status(404).json({Error:"Error in updatingga  game by its id",error:err.message})
	}
}

const deleteGame  =async(req,res)=>{
	const{id} = req.params;
	try{
        let game = await gameModel.findById(id);
		if(!game){
			return res.status(400).json({Error:"Game id is not valid"});

		}
		game = await gameModel.findByIdAndDelete(id);
		res.status(200).json({MEssgae:"Game Deleted"});
	}catch(err){
		res.status(404).json({Error:"Error in deletinggga  game by its id",error:err.message})
	}
}

module.exports = {
	addGame,getGames,
	getGamebyId,updateGameById,deleteGame
}
