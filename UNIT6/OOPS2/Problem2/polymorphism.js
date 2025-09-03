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
var PolyDuck = /** @class */ (function () {
    function PolyDuck() {
    }
    PolyDuck.prototype.fly = function () {
        console.log("I can fly!!");
    };
    return PolyDuck;
}());
var DesiDuck = /** @class */ (function (_super) {
    __extends(DesiDuck, _super);
    function DesiDuck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DesiDuck.prototype.fly = function () {
        console.log("DesiDuck flies at 10kmph");
    };
    return DesiDuck;
}(PolyDuck));
var VidesiDuck = /** @class */ (function (_super) {
    __extends(VidesiDuck, _super);
    function VidesiDuck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VidesiDuck.prototype.fly = function () {
        console.log("VidesiDuck flies at 20kmph");
    };
    return VidesiDuck;
}(PolyDuck));
var SmartDuck = /** @class */ (function (_super) {
    __extends(SmartDuck, _super);
    function SmartDuck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartDuck.prototype.fly = function () {
        console.log("SmartDuck flies at 50ph");
    };
    return SmartDuck;
}(PolyDuck));
var d1 = new DesiDuck();
var s1 = new SmartDuck();
var v1 = new VidesiDuck();
d1.fly();
v1.fly();
s1.fly();
//Problem 2 
var User = /** @class */ (function () {
    function User(name, role) {
        this.orgCode = "DuckCorp";
        this.name = name;
        this.role = role;
    }
    User.prototype.introduce = function () {
        console.log("I am ".concat(this.name, " from ").concat(this.orgCode));
    };
    return User;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(name, role) {
        return _super.call(this, name, role) || this;
    }
    Manager.prototype.getRole = function () {
        console.log("Role is :".concat(this.role));
    };
    return Manager;
}(User));
var u1 = new User("MAhesh", "Admin");
u1.introduce();
console.log(u1.name, u1.role, u1.orgCode);
var m1 = new Manager("Anand", "manager");
m1.introduce();
m1.getRole();
