const mongoose = require("mongoose");
const postModel = require("../models/postModel");
const addPost = async(req,res)=>{
	try{

        const {title,content} = req.body;
		const author = req.user.userId;



		const post = await postModel.create({...req.body,author});
		return res.status(201).json({Message:"Yes",post})
	}
	catch(err){
		return res.status(404).json({Error:"Error in adding a Post",Err:err.message})
	}
}
const getPosts = async(req,res)=>{
	try{     
 
           if(req.user.role=="User"){

			let allPosts = await postModel.find({author:req.user.userId}).populate("author","username email")
			return res.status(201).json({Message:"Here are the posts of user",allPosts});

		   }else{
                      let uposts = await postModel.find().populate("author","username email");
					  return res.status(201).json({Message:"All posts",uposts})
		   }

            
	}
	catch(err){
		return res.status(404).json({Error:"Error in gettingsPosts",Err:err.message})
	}
}



const getPostByid = async(req,res)=>{
	try{
		const {id} = req.params.id;
		let post = await postModel.find({_id:id})
		if(!post){
			return res.status(404).json({Error:"Post is not exist"})
		}else{
			return res.status(201).json({Message:"Here's the Post",post})
		}

	}
	catch(err){
		return res.status(404).json({Error:"Error in getting aa post by post Id",Err:err.message});
	}
}


module.exports = {
	addPost,
	getPosts,getPostByid
}