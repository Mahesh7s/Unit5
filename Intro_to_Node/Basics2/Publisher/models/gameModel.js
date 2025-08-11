const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema({
	title:{type:String,required:true},
	genre:{type:String,enum:["RPG","Action","Adventure","Strategy","Sports"]},
	releaseDate:Date,
	publisher:{type:mongoose.Schema.Types.ObjectId,ref:"Publishers",required:true}


})

const gameModel = mongoose.model("Games",gameSchema);
module.exports = gameModel;
