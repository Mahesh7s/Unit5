var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Vehicle "interface" (enforced by convention in JS)
var Vehicle = /** @class */ (function () {
    function Vehicle(name) {
        this.name = name;
    }
    Vehicle.prototype.getDetails = function () {
        throw new Error("getDetails() must be implemented");
    };
    return Vehicle;
}());
// Bike class
var Bike = /** @class */ (function (_super) {
    __extends(Bike, _super);
    function Bike() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bike.prototype.getDetails = function () {
        return "Bike: ".concat(this.name);
    };
    return Bike;
}(Vehicle));
// Car class
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Car.prototype.getDetails = function () {
        return "Car: ".concat(this.name);
    };
    return Car;
}(Vehicle));
// VehicleFactory
var VehicleFactory = /** @class */ (function () {
    function VehicleFactory() {
    }
    VehicleFactory.createVehicle = function (type, name) {
        switch (type) {
            case "Bike":
                return new Bike(name);
            case "Car":
                return new Car(name);
            default:
                throw new Error("Unknown vehicle type: ".concat(type));
        }
    };
    return VehicleFactory;
}());
// ✅ Usage
var myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
console.log(myBike.getDetails()); // Bike: Yamaha
var myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myCar.getDetails()); // Car: Toyota
