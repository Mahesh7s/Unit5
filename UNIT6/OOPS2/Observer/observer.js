// Concrete Observers
var Smartphone = /** @class */ (function () {
    function Smartphone() {
    }
    Smartphone.prototype.update = function () {
        console.log("Smartphone received notification");
    };
    return Smartphone;
}());
var Tablet = /** @class */ (function () {
    function Tablet() {
    }
    Tablet.prototype.update = function () {
        console.log("Tablet received notification");
    };
    return Tablet;
}());
// Subject
var NotificationCenter = /** @class */ (function () {
    function NotificationCenter() {
        this.observers = [];
    }
    NotificationCenter.prototype.attach = function (observer) {
        this.observers.push(observer);
        console.log("Observer added: ".concat(observer.constructor.name));
    };
    NotificationCenter.prototype.detach = function (observer) {
        this.observers = this.observers.filter(function (obs) { return obs !== observer; });
        console.log("Observer removed: ".concat(observer.constructor.name));
    };
    NotificationCenter.prototype.notify = function () {
        this.observers.forEach(function (observer) { return observer.update(); });
    };
    return NotificationCenter;
}());
// Main
var notificationCenter = new NotificationCenter();
var phone = new Smartphone();
var tablet = new Tablet();
notificationCenter.attach(phone);
notificationCenter.attach(tablet);
notificationCenter.notify();
