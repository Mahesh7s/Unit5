// Step 1: Define interface
interface IEngine {
  start(): void;
}

// Step 2: PetrolEngine implements IEngine
class PetrolEngine implements IEngine {
  start(): void {
    console.log("Petrol engine started");
  }
}

// Step 3: DieselEngine implements IEngine
class DieselEngine implements IEngine {
  start(): void {
    console.log("Diesel engine started");
  }
}

// Step 4: Car depends on IEngine, not a specific class
class Car2{
  private engine: IEngine;

  constructor(engine: IEngine) {
    this.engine = engine;
  }

  drive(): void {
    this.engine.start();
    console.log("Driving car");
  }
}


const petrolCar = new Car2(new PetrolEngine());
petrolCar.drive();

const dieselCar = new Car2(new DieselEngine());
dieselCar.drive();
