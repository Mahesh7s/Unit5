const mongoose = require("mongoose");
let connectToDatabase =  async()=>{
try{
		await mongoose.connect("mongodb://127.0.0.1:27017/App")
		console.log("Connected to Ecommerce databse");

}
catch(err){
	console.log("An error occured while connecting to databse",err)
}
}

module.exports = connectToDatabase;