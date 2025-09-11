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
// Base Character class (acts as an interface)
var Character = /** @class */ (function () {
    function Character(name) {
        this.name = name;
    }
    Character.prototype.getStats = function () {
        throw new Error("getStats() must be implemented");
    };
    return Character;
}());
// Warrior class
var Warrior = /** @class */ (function (_super) {
    __extends(Warrior, _super);
    function Warrior() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Warrior.prototype.getStats = function () {
        return "Warrior ".concat(this.name, " - Strength: 90, Defense: 80");
    };
    return Warrior;
}(Character));
// Archer class
var Archer = /** @class */ (function (_super) {
    __extends(Archer, _super);
    function Archer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Archer.prototype.getStats = function () {
        return "Archer ".concat(this.name, " - Agility: 80, Strength: 40");
    };
    return Archer;
}(Character));
// Mage class
var Mage = /** @class */ (function (_super) {
    __extends(Mage, _super);
    function Mage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mage.prototype.getStats = function () {
        return "Mage ".concat(this.name, " - Intelligence: 90, Mana: 100");
    };
    return Mage;
}(Character));
// CharacterFactory
var CharacterFactory = /** @class */ (function () {
    function CharacterFactory() {
    }
    CharacterFactory.createCharacter = function (type, name) {
        switch (type) {
            case "Warrior":
                return new Warrior(name);
            case "Archer":
                return new Archer(name);
            case "Mage":
                return new Mage(name);
            default:
                throw new Error("Unknown character type: ".concat(type));
        }
    };
    return CharacterFactory;
}());
var archer = CharacterFactory.createCharacter("Archer", "Eldrin");
console.log(archer.getStats());
// Output: Archer Eldrin - Agility: 80, Strength: 40
var mage = CharacterFactory.createCharacter("Mage", "Gandalf");
console.log(mage.getStats());
// Output: Mage Gandalf - Intelligence: 90, Mana: 100
var warrior = CharacterFactory.createCharacter("Warrior", "Thorin");
console.log(warrior.getStats());
// Output: Warrior Thorin - Strength: 90, Defense: 80
