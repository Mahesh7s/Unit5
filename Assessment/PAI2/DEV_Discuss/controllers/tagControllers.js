const mongoose = require("mongoose");
const tagModel = require("../models/tagModel");
const addTag = async(req,res)=>{
	try{
         const {name} = req.body;
		 let tag = await tagModel.findOne({name});
		 if(tag){
			return res.status(400).json({Error:"Tag is already created"});

		 }
		 else{
			let tag = await tagModel.create(req.body)
			return res.status(201).json({Message:"Tag is created",tag});
		 }
	}
	catch(err){
		return res.status(404).json({Error:"Error in creating a tag",Err:err.message});
	}
}

module.exports ={addTag,}