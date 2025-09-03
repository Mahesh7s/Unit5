interface Printable{
	print():void;
}

class MyDocument implements Printable{
	print():void{
		console.log("Printing Document..")
	}
}
class Photo implements Printable{
	print():void{
		console.log("Photo Priniting....");
	}
}

let d1 = new MyDocument();
let p1 =  new Photo();
let items:Printable [] = [new MyDocument(), new Photo()];
for (let item of items) {
  item.print();  
}
