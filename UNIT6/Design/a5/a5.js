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
var Beverage = /** @class */ (function () {
    function Beverage() {
    }
    return Beverage;
}());
var Coffee = /** @class */ (function (_super) {
    __extends(Coffee, _super);
    function Coffee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Coffee.prototype.getDescription = function () {
        return "Coffee";
    };
    Coffee.prototype.getCost = function () {
        return 50;
    };
    return Coffee;
}(Beverage));
var Sugar = /** @class */ (function (_super) {
    __extends(Sugar, _super);
    function Sugar(beverage) {
        var _this = _super.call(this) || this;
        _this.beverage = beverage;
        return _this;
    }
    Sugar.prototype.getDescription = function () {
        return this.beverage.getDescription() + " + Sugar";
    };
    Sugar.prototype.getCost = function () {
        return this.beverage.getCost() + 10;
    };
    return Sugar;
}(Beverage));
var Honey = /** @class */ (function (_super) {
    __extends(Honey, _super);
    function Honey(beverage) {
        var _this = _super.call(this) || this;
        _this.beverage = beverage;
        return _this;
    }
    Honey.prototype.getDescription = function () {
        return this.beverage.getDescription() + " + Honey";
    };
    Honey.prototype.getCost = function () {
        return this.beverage.getCost() + 20;
    };
    return Honey;
}(Beverage));
var WhippedCream = /** @class */ (function (_super) {
    __extends(WhippedCream, _super);
    function WhippedCream(beverage) {
        var _this = _super.call(this) || this;
        _this.beverage = beverage;
        return _this;
    }
    WhippedCream.prototype.getDescription = function () {
        return this.beverage.getDescription() + " + WhippedCream";
    };
    WhippedCream.prototype.getCost = function () {
        return this.beverage.getCost() + 15;
    };
    return WhippedCream;
}(Beverage));
var myDrink = new WhippedCream(new Honey(new Sugar(new Coffee())));
console.log(myDrink.getDescription());
console.log(myDrink.getCost());
