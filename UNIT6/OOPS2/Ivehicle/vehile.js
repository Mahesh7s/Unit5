// Step 2: Car class implementing IVehicle
var Car1 = /** @class */ (function () {
    function Car1() {
    }
    Car1.prototype.start = function () {
        console.log("Car is starting");
    };
    return Car1;
}());
// Step 3: Bike class implementing IVehicle
var Bike = /** @class */ (function () {
    function Bike() {
    }
    Bike.prototype.start = function () {
        console.log("Bike is starting");
    };
    return Bike;
}());
// Step 4: Driver class using IVehicle
var Driver = /** @class */ (function () {
    function Driver(vehicle) {
        this.vehicle = vehicle;
    }
    Driver.prototype.drive = function () {
        this.vehicle.start();
        console.log("Driving...");
    };
    return Driver;
}());
// Main execution
var carDriver = new Driver(new Car1());
carDriver.drive();
var bikeDriver = new Driver(new Bike());
bikeDriver.drive();
