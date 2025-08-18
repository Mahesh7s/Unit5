const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
	user:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
	dish:{type:mongoose.Schema.Types.ObjectId,ref:"dishes",required:true},
	chef:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
	status:{
		type:String,
		enum: ["Order Received", "Preparing", "Out for Delivery", "Delivered"], 
        default: "Order Received" 
	}
})

const orderModel = mongoose.model("orders",orderSchema);
module.exports = orderSchema;