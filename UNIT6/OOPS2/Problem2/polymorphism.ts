class PolyDuck{
	fly():void{
		console.log("I can fly!!");
	}
}

class DesiDuck extends PolyDuck{
	fly():void{
		console.log("DesiDuck flies at 10kmph");
	}

}
class VidesiDuck extends PolyDuck{
fly():void{
		console.log("VidesiDuck flies at 20kmph");
	}
}
class SmartDuck extends PolyDuck{
fly():void{
		console.log("SmartDuck flies at 50ph");
	}
}

let d1 = new DesiDuck();
let s1 = new SmartDuck();
let v1 = new VidesiDuck();
d1.fly();
v1.fly();
s1.fly();


//Problem 2 

class User{
	public name:string;
	private orgCode:string = "DuckCorp";
	protected role:string;
	constructor(name:string,role:string){
		this.name = name;
		this.role = role;
	}
	introduce():void{
		console.log(`I am ${this.name} from ${this.orgCode}`)
	}

}
class Manager extends User{
     constructor(name:string,role:string){
		super(name,role);
	 }
	 getRole():void{
		console.log(`Role is :${this.role}`);
	 }

	}

	let u1 = new User("MAhesh","Admin");
	u1.introduce();
	//console.log(u1.name,u1.role,u1.orgCode);
	let m1 = new Manager("Anand","manager");
	m1.introduce();
	m1.getRole();
