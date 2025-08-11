const mongoose = require("mongoose");
const publisherModel = require("../models/publisherModel");
const gameModel = require("../models/gameModel");

const addPublisher = async(req,res)=>{
	try{
   let publisher  = await publisherModel.create(req.body);
   res.status(201).json({Message:"Publisher was added",publisher});

	}
	catch(err){
		res.status(404).json({Error:"Error in adding a Publisgher",error:err.message});
	}
}



const getPublishers = async(req,res)=>{
	try{
       let publishers = await publisherModel.find();
	   res.status(200).json({Message:"Publishers list",publishers})
	}
	catch(err){
		res.status(404).json({Error:"Error occured in getting publishers"});
	}
}

const getPublisherById = async(req,res)=>{
	const {id} = req.params;
	try{

		let publisher = await publisherModel.findById(id);
		if(!publisher){
			return res.status(404).json({Error:"Publisher is not balid"});
		}
		res.status(200).json({Message:"Publisher by the id",publisher});


	}catch(err){
		res.status(404).json({Error:"Error in getting a publisher by hiud id",Error:err.message});
	}
}


const updatePublisher = async(req,res)=>{
	const {id} = req.params;
	try{
      let publisher = await publisherModel.findById(id);
	 
	  if(!publisher){
			return res.status(404).json({Error:"Publisher is not balid"});
		}
         //res.json({publisher})
       publisher  = await publisherModel.findByIdAndUpdate(id,req.body);
	   res.status(202).json({Message:"Publisher updated",publisher});

	}

	catch(err){
		res.status(404).json({Error:"error in updayting the publisher",Error:err.message});
	}
}

const deletePublisher = async(req,res)=>{
	try{

		const {id} = req.params;
		let user = await publisherModel.findById(id);
		if(!user){
			return res.status(400).json({Message:"Publisher already deleted"});

		}
		await publisherModel.findByIdAndDelete(id)
	}
	catch(err){
		res.status(404).json({Error:"Error in deleting the publisher",Error:err.message});
	}
}

const getAllGamesByPublisherId = async(req,res)=>{
   const {id} =req.params;
   try{

    let publisher = await publisherModel.findById(id);
	if(!publisher){
		return res.status(400).json({Error:"Publisher is not valid"});

	}
	let games = await gameModel.find({"publisher":id});
	res.status(200).json({Messgae:"Here are the games of the user","Name":publisher.name,games});

   }
   catch(err){
	res.status(404).json({Error:"Error in fetching games of a particular user",Error:err.message});

   }

}


module.exports = {
	addPublisher,
	getPublishers,
	getPublisherById,
	updatePublisher,deletePublisher,
	getAllGamesByPublisherId
}
