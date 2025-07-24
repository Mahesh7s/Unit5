const fs = require("fs");

function readFileData(){
	fs.readFile("./data.txt","utf-8",(err,data)=>{
	if(err) console.log(err)
	console.log(data);
})
}



function appendFileData(){
	fs.appendFile("./data.txt","This is Appended data",(err)=>{
	if(err) console.log(err)
})
}


module.exports = {readFileData,appendFileData}