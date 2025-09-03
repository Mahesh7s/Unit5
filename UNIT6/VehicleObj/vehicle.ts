// Vehicle.ts
class Vehicle {
  brand: string;
  speed: number;

  constructor(brand: string, speed: number) {
    this.brand = brand;
    this.speed = speed;
  }

  drive(): void {
    console.log(`Driving at ${this.speed} km/h`);
  }
}

class Car extends Vehicle {
  fuelType: string;

  constructor(brand: string, speed: number, fuelType: string) {
    super(brand, speed);
    this.fuelType = fuelType;
  }

  refuel(): void {
    console.log(`Refueling ${this.fuelType}`);
  }
}

// Create an instance of Car
const myCar = new Car("Toyota", 120, "Petrol");

// Call methods
myCar.drive();
myCar.refuel();
