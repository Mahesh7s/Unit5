class Person{
	walk():void{
       console.log("Person is walking");
	}
}

interface Coder{
	code():void;
}

class Developer extends Person implements Coder{
	walk():void{
		console.log("Developer is Walking");

	}
	code():void{
		console.log("Developer is Coding!");
	}
}
const i1 = new Coder();
const p1 = new Person();
const d1 = new Developer();
p1.walk();
d1.walk();
d1.code();