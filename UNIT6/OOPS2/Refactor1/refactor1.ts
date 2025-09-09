// Step 1: Define interface
interface Vehicle {
  start(): void;
}

// Step 2: Bike implementing Vehicle
class Bike implements Vehicle {
  start(): void {
    console.log("Bike is starting");
  }
}

// Step 3: Car implementing Vehicle
class Car implements Vehicle {
  start(): void {
    console.log("Car is starting");
  }
}

// Step 4: Driver class using Vehicle
class Driver {
  private vehicle: Vehicle;

  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }

  // Switch strategy at runtime
  setVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
  }

  drive(): void {
    this.vehicle.start();
    console.log("Driving...");
  }
}

// Main
const driver = new Driver(new Bike());
driver.drive();

driver.setVehicle(new Car()); // switching at runtime
driver.drive();
