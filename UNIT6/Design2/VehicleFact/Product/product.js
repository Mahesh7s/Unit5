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
// Base Product class
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    Product.prototype.getDescription = function () {
        throw new Error("getDescription() must be implemented");
    };
    return Product;
}());
// Laptop class
var Laptop = /** @class */ (function (_super) {
    __extends(Laptop, _super);
    function Laptop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Laptop.prototype.getDescription = function () {
        return "Laptop: ".concat(this.name, ", Price: $").concat(this.price);
    };
    return Laptop;
}(Product));
// Mobile class
var Mobile = /** @class */ (function (_super) {
    __extends(Mobile, _super);
    function Mobile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mobile.prototype.getDescription = function () {
        return "Mobile: ".concat(this.name, ", Price: $").concat(this.price);
    };
    return Mobile;
}(Product));
// Tablet class
var Tablet = /** @class */ (function (_super) {
    __extends(Tablet, _super);
    function Tablet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tablet.prototype.getDescription = function () {
        return "Tablet: ".concat(this.name, ", Price: $").concat(this.price);
    };
    return Tablet;
}(Product));
// 🔹 Class Map (pluggable strategy)
var productMap = {
    Laptop: Laptop,
    Mobile: Mobile,
    Tablet: Tablet
};
// ProductFactory (does not change when new products are added)
var ProductFactory = /** @class */ (function () {
    function ProductFactory() {
    }
    ProductFactory.createProduct = function (type, name, price) {
        var ProductClass = productMap[type];
        if (!ProductClass)
            throw new Error("Unknown product type: ".concat(type));
        return new ProductClass(name, price);
    };
    return ProductFactory;
}());
// ✅ Usage
var laptop = ProductFactory.createProduct("Laptop", "MacBook Pro", 2500);
console.log(laptop.getDescription());
// Output: Laptop: MacBook Pro, Price: $2500
var mobile = ProductFactory.createProduct("Mobile", "iPhone 15", 1500);
console.log(mobile.getDescription());
// Output: Mobile: iPhone 15, Price: $1500
var tablet = ProductFactory.createProduct("Tablet", "Galaxy Tab", 1100);
console.log(tablet.getDescription());
// Output: Tablet: Galaxy Tab, Price: $1100
// 🔹 Adding a new product dynamically (no factory change)
var SmartWatch = /** @class */ (function (_super) {
    __extends(SmartWatch, _super);
    function SmartWatch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartWatch.prototype.getDescription = function () {
        return "SmartWatch: ".concat(this.name, ", Price: $").concat(this.price);
    };
    return SmartWatch;
}(Product));
// Register new product
productMap.SmartWatch = SmartWatch;
var watch = ProductFactory.createProduct("SmartWatch", "Apple Watch", 800);
console.log(watch.getDescription());
// Output: SmartWatch: Apple Watch, Price: $800
