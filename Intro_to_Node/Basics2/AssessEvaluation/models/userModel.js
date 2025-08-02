const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name:{type:String,required:true},
	email:{type:String,unique:true},
	address:{type:String},
	createdAt:{type:Date}
})



const userModel = mongoose.model("users",userSchema);

module.exports = userModel;
