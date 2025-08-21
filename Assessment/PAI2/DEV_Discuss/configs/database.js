const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();


const connectDatabase = async()=>{
	try{
		await mongoose.connect(process.env.MONGO_URI);
		console.log(process.env.MONGO_URI);
		console.log("Connected to DEVDISCUSS database");
	}
	catch(err){
		console.log("Something error in database connection",err);
	}
}




module.exports = connectDatabase;
