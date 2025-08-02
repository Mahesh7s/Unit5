const mongoose = require("mongoose");
const express = require("express");
const productModel = require("../models/productModel");

const getAllProducts = async(req,res)=>{
	try{
        let products = await productModel.find({});
		if(products.length==0){
			res.status(200).json({message:"No products, yet Add a product"});

		}else{
			res.status(200).json({message:"Here are your products",products});
		}
	}catch(err){
		res.status(500).json({Error:"Something wrong in getting products",err})
	}
}

const addProduct = async(req,res)=>{
	try{
	 let item = {...req.body,createdAt: new Date()}
     let product = await productModel.create(item);
	 res.status(201).json({message:"Product added ",product})

	}
	catch(err){
		res.status(404).json({Error:"Error in adding a product",err})
	}
}


const updateProduct = async(req,res)=>{
	try{
        
		const{id} = req.params;
		let product =  await productModel.findById(id);
		if(!product){

		return res.status(500).json({msg:"Id is not available"})
		}
		await productModel.findByIdAndUpdate(id,req.body,{new:true});
		res.status(200).json({message:"Product updated succesfully"})
	}
	catch(err){
	res.status(500).json({Error:"Something wrong in updating the product",err})
	}
}




const productsbyPrice = async(req,res)=>{

try{
  
	let products = await productModel.find({price:{$gte:100}});
	if(products.length==0){
		return res.status(500).json({msg:"No products avaailable"})
	}
	else{
		res.status(200).json({message:"Available products",products})
	}
}
catch(err){
	res.status(500).json({error:"something went wrong",err})
}


}


//deleting the product
const deleteProduct = async(req,res)=>{
	try{
        
		const{id} = req.params;
		let product =  await productModel.findById(id);
		if(!product){

		return res.status(500).json({msg:"Id is not available"})
		}
		await productModel.findByIdAndDelete(id);
		res.status(200).json({message:"Product deleted succesfully"})
	}
	catch(err){
	res.status(500).json({Error:"Something wrong in updating the product",err})
	}
}




module.exports = {
	getAllProducts,addProduct, updateProduct,deleteProduct,productsbyPrice,
}