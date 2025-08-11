const mongoose =require("mongoose");

const genreValidation = (req,res,next)=>{
	const {genre} = req.body;
	let validGenre = ["RPG","Action","Adventure","Strategy","Sports"];
	if(!validGenre.includes(genre)){
		return res.status(404).json({Error:"Select a valid genre",validGenre});

	}
	else{
		next()
	}
}
module.exports = genreValidation;