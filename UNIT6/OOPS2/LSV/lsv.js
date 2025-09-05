// A Sparrow can eat and fly
var Sparrow = /** @class */ (function () {
    function Sparrow() {
    }
    Sparrow.prototype.eat = function () {
        console.log("Sparrow eating seeds...");
    };
    Sparrow.prototype.fly = function () {
        console.log("Sparrow flying high...");
    };
    return Sparrow;
}());
// An Ostrich can eat but not fly
var Ostrich = /** @class */ (function () {
    function Ostrich() {
    }
    Ostrich.prototype.eat = function () {
        console.log("Ostrich eating plants...");
    };
    return Ostrich;
}());
// ✅ Client code
function feedBird(bird) {
    bird.eat();
}
function makeItFly(bird) {
    bird.fly();
}
// Usage
var sparrow = new Sparrow();
var ostrich = new Ostrich();
feedBird(sparrow);
feedBird(ostrich);
makeItFly(sparrow);
//makeItFly(ostrich); 
