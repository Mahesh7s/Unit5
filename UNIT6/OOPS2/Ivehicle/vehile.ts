
// Step 1: Define an interface
interface IVehicle {
  start(): void;
}

// Step 2: Car class implementing IVehicle
class Car1 implements IVehicle {
  start(): void {
    console.log("Car is starting");
  }
}

// Step 3: Bike class implementing IVehicle
class Bike implements IVehicle {
  start(): void {
    console.log("Bike is starting");
  }
}

// Step 4: Driver class using IVehicle
class Driver {
  private vehicle: IVehicle;

  constructor(vehicle: IVehicle) {
    this.vehicle = vehicle;
  }

  drive(): void {
    this.vehicle.start();
    console.log("Driving...");
  }
}

// Main execution
const carDriver = new Driver(new Car1());
carDriver.drive();

const bikeDriver = new Driver(new Bike());
bikeDriver.drive();
