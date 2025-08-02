const mongoose = require("mongoose");
const express = require("express");
const userModel = require("../models/userModel");
const getAllUsers = async(req,res)=>{
   try{
        let users= await userModel.find({});
		if(users.length==0){
			res.status(200).json({message:"No products, yet Add a product"});

		}else{
			res.status(200).json({message:"Here are your products",users});
		}
	}catch(err){
		res.status(500).json({Error:"Something wrong in getting products",err})
	}
}
const addUser = async(req,res)=>{

try{
	 let user = {...req.body,createdAt: new Date()}
     let product = await userModel.create(user);
	 res.status(201).json({message:"Product added ",product})

	}
	catch(err){
		res.status(404).json({Error:"Error in adding a product",err})
	}
}

module.exports = {
	addUser,getAllUsers,
}