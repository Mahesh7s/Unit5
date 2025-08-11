const requestMdle = (req,res,next)=>{
	//console.log(req.body)
	let time = new Date().toISOString();
	req = {...req,timeStamp:time}
console.log(req);
	next();


}

module.exports = requestMdle