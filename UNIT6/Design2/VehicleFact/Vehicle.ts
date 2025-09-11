// Vehicle "interface" (enforced by convention in JS)
class Vehicle {
  constructor(name) {
    this.name = name;
  }

  getDetails() {
    throw new Error("getDetails() must be implemented");
  }
}

// Bike class
class Bike extends Vehicle {
  getDetails() {
    return `Bike: ${this.name}`;
  }
}

// Car class
class Car extends Vehicle {
  getDetails() {
    return `Car: ${this.name}`;
  }
}

// VehicleFactory
class VehicleFactory {
  static createVehicle(type, name) {
    switch (type) {
      case "Bike":
        return new Bike(name);
      case "Car":
        return new Car(name);
      default:
        throw new Error(`Unknown vehicle type: ${type}`);
    }
  }
}


const myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
console.log(myBike.getDetails()); // Bike: Yamaha

const myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myCar.getDetails()); // Car: Toyota
