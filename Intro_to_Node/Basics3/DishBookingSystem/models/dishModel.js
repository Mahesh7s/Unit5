const mongoose = require("mongoose");
const dishSchema = new mongoose.Schema({
	 name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true } // Admin ID

})


const dishModel = mongoose.model("dishes",dishSchema);
module.exports = dishModel;


