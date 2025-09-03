//Problem 1

class Duck{
	swim():void{
		console.log("I know Swimming");
	}
}

class MallardDuck extends Duck{

}

let d1 = new MallardDuck();
d1.swim();

//Problem2

class Bird{
	fly():void{
		console.log("I can fly");
	}

}
class Penguin extends Bird{
	fly():void{
		console.log("I cannot fly!!");
	}

}

let b1 = new Bird();
let p1 = new Penguin();
b1.fly();
p1.fly();


//Problem 3

interface IDuck{
	swim():void;
	fly():void;
	sound():void;
}

class ToyDuck implements IDuck{
	swim():void{
          console.log("Can float on water");
	}
	sound():void{
		console.log("Cannot Sound");

	}
	fly():void{
		  console.log("Cannot fly");
	}
}

let t1 = new ToyDuck();
t1.swim();
t1.fly();
t1.sound();
