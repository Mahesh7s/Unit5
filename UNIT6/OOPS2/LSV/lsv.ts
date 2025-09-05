// Base type for all birds
interface Bird {
  eat(): void;
}

// Separate interface for birds that can fly
interface FlyingBird extends Bird {
  fly(): void;
}

// A Sparrow can eat and fly
class Sparrow implements FlyingBird {
  eat(): void {
    console.log("Sparrow eating seeds...");
  }
  fly(): void {
    console.log("Sparrow flying high...");
  }
}

// An Ostrich can eat but not fly
class Ostrich implements Bird {
  eat(): void {
    console.log("Ostrich eating plants...");
  }
}

// ✅ Client code
function feedBird(bird: Bird) {
  bird.eat();
}

function makeItFly(bird: FlyingBird) {
  bird.fly();
}

// Usage
const sparrow = new Sparrow();
const ostrich = new Ostrich();

feedBird(sparrow);   
feedBird(ostrich);  

makeItFly(sparrow); 
//makeItFly(ostrich); 
