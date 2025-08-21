const logger = (req,res,next)=>{
	let data = {
		Method:req.method,
		URL:req.url,
		Time:Date.now()
	}
	console.log(data);
	
	next()
}

module.exports ={
	logger,
}