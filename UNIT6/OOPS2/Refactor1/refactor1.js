// Step 2: Bike implementing Vehicle
var Bike = /** @class */ (function () {
    function Bike() {
    }
    Bike.prototype.start = function () {
        console.log("Bike is starting");
    };
    return Bike;
}());
// Step 3: Car implementing Vehicle
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.start = function () {
        console.log("Car is starting");
    };
    return Car;
}());
// Step 4: Driver class using Vehicle
var Driver = /** @class */ (function () {
    function Driver(vehicle) {
        this.vehicle = vehicle;
    }
    // Switch strategy at runtime
    Driver.prototype.setVehicle = function (vehicle) {
        this.vehicle = vehicle;
    };
    Driver.prototype.drive = function () {
        this.vehicle.start();
        console.log("Driving...");
    };
    return Driver;
}());
// Main
var driver = new Driver(new Bike());
driver.drive();
driver.setVehicle(new Car()); // switching at runtime
driver.drive();
