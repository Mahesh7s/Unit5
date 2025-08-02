const mongoose = require("mongoose");

const addOrder = async(req,res)=>{

}


const getOrders = async(req,res)=>{

try{
 const {id} = req.params;
let orders= await orderModel.find({userId:id});
		if(orders.length==0){
			res.status(200).json({message:"No products, yet Add a product"});

		}else{
			res.status(200).json({message:"Here are your products",orders});
		}
	}
	catch(err){
		res.status(500).json({Error:"Something wrong in getting products",err})
	}


}

const deleteOrder = async(req,res)=>{
		
	}

module.exports = {
	getOrders,addOrder,deleteOrder
}