// Step 2: Create concrete strategies
var StandardShipping = /** @class */ (function () {
    function StandardShipping() {
    }
    StandardShipping.prototype.calculate = function () {
        return 50;
    };
    return StandardShipping;
}());
var ExpressShipping = /** @class */ (function () {
    function ExpressShipping() {
    }
    ExpressShipping.prototype.calculate = function () {
        return 100;
    };
    return ExpressShipping;
}());
// 🚀 Easily add new shipping types without touching existing code
var OvernightShipping = /** @class */ (function () {
    function OvernightShipping() {
    }
    OvernightShipping.prototype.calculate = function () {
        return 150;
    };
    return OvernightShipping;
}());
// Step 3: Shipping context uses a strategy
var Shipping = /** @class */ (function () {
    function Shipping(strategy) {
        this.strategy = strategy;
    }
    Shipping.prototype.calculate = function () {
        return this.strategy.calculate();
    };
    return Shipping;
}());
var standard = new Shipping(new StandardShipping());
console.log(standard.calculate()); // 50
var express = new Shipping(new ExpressShipping());
console.log(express.calculate()); // 100
var overnight = new Shipping(new OvernightShipping());
console.log(overnight.calculate()); // 150
