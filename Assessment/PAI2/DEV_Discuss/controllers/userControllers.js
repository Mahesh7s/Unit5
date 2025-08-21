const mongoose =  require("mongoose");
const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const saltRounds = 10;
const register = async(req,res)=>{
	try{

		const {username,email,role,password} = req.body;
        bcrypt.hash(password, saltRounds, async function(err, hash) {
	if(err){
		return res.status(404).json({Error:"Error in hasing the apssword",Err:err.message});

	}
	else{
		let user =  await userModel.create({username,email,password:hash,role});
		return res.status(201).json({Message:"User Registered Successfully",name:user.username});
	}  
})

	}
	catch(err){
		return res.status(404).json({Error:"Error in registering the user",Err:err.message});
	}
}

const login = async(req,res)=>{
	try{
      const {email,password,role} = req.body;
	  let user = await userModel.findOne({email})
	  if(!user){
		return res.status(404).json({Error:"USer is not registered,please register"})
	  }
	  let hash = user.password;
	  bcrypt.compare(password, hash, async function(err, result) {

		if(result==true){

			let accessToken = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:300});
            

			return res.status(202).json({Message:"USer Logged in Succesfully",accessToken})
		}else{
			return res.status(409).json({Error:"Wrong Password!!!!"});

		}
});



	}catch(err){
		res.status(404).json({Error:"Error in logging the user",errr:err.message});
	}
}





module.exports = {
	register,login
}