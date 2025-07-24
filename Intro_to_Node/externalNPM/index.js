const boxen = require("boxen");

console.log(boxen("unicorn",{padding:2,borderStyle:"double",borderColor:"green"}))
console.log(boxen("I am using my first external module!",{
	title:"Hurray!!!",borderStyle:"classic",titleAlignment:"center"
}))

console.log(boxen("I am using my first external module!",{
	title:"Hurray!!!",borderStyle:"doubleSingle",backgroundColor:"red",titleAlignment:"center"
}))

console.log(boxen("I am using my first external module!",{
	title:"Hurray!!!",borderStyle:"round",backgroundColor:"green",titleAlignment:"center"
}))

console.log(boxen("I am using my first external module!",{
	title:"Hurray!!!",borderStyle:"singleDouble",backgroundColor:"blue",titleAlignment:"center"
}))