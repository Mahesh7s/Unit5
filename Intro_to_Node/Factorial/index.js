const fact = require("./factorial");
let arr = [5,7,10];
for(let i=0;i<arr.length;i++){
	let num = fact(arr[i]);
	console.log("Factorial of 5 is: ",num)
}