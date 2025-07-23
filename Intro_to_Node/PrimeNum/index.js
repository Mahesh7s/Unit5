const isPrime = require("./nodePrime.js");

let arr = [2,10,17,21,29];
for(let i=0;i<arr.length;i++){
	if(isPrime(arr[i])){
		console.log(`${arr[i]} is a prime number`)
	}else{
		console.log(`${arr[i]} is not a prime number`)
	}
}
