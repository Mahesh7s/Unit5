const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMid = (role)=>{
	return (req,res,next)=>{

		let token = req.headers?.authorization?.split(" ")[1];
			console.log(req.headers.authorization)
			if(token){
				let decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
				if(decoded){
					if(role.includes(decoded.role)){
					//console.log(decoded)
                     req.user=decoded
					next();
					}else{
						return res.status(404).json({error:"Un authorised operations!"})
					}
					
				}else{
					res.status(404).json({messgae:"Login Failed,please Login again!"})
				}
			}
			else{
				res.status(404).json({Error:"Un Authorised"});
			}
		

	}

}

module.exports = {authMid}