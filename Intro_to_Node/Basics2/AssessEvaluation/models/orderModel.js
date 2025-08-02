const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
	products:[{
		productId:{type:mongoose.Schema.Types.ObjectId,ref:"products"},
		quantity:{type:Number,required:true,min:1}
	}],
	totalAmount:{type:Number,min:1},
	orderedAt:{type:Date}

})


const orderModel = mongoose.model("orders",orderSchema);
module.exports = orderModel;