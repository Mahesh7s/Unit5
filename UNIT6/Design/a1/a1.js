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
// Abstract class Beverage
var Beverage = /** @class */ (function () {
    function Beverage() {
    }
    return Beverage;
}());
// Concrete class GreenTea
var GreenTea = /** @class */ (function (_super) {
    __extends(GreenTea, _super);
    function GreenTea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GreenTea.prototype.getDescription = function () {
        return "Green Tea";
    };
    GreenTea.prototype.getCost = function () {
        return 40;
    };
    return GreenTea;
}(Beverage));
// ✅ Test
var tea = new GreenTea();
console.log(tea.getDescription()); // Green Tea
console.log(tea.getCost()); // 40
