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
// Base Notification "interface"
var Notification = /** @class */ (function () {
    function Notification() {
    }
    Notification.prototype.send = function (message) {
        throw new Error("send() must be implemented");
    };
    return Notification;
}());
// EmailNotification
var EmailNotification = /** @class */ (function (_super) {
    __extends(EmailNotification, _super);
    function EmailNotification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailNotification.prototype.send = function (message) {
        console.log("Sending EMAIL: ".concat(message));
    };
    return EmailNotification;
}(Notification));
// SMSNotification
var SMSNotification = /** @class */ (function (_super) {
    __extends(SMSNotification, _super);
    function SMSNotification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SMSNotification.prototype.send = function (message) {
        console.log("Sending SMS: ".concat(message));
    };
    return SMSNotification;
}(Notification));
// PushNotification
var PushNotification = /** @class */ (function (_super) {
    __extends(PushNotification, _super);
    function PushNotification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushNotification.prototype.send = function (message) {
        console.log("Sending PUSH: ".concat(message));
    };
    return PushNotification;
}(Notification));
// NotificationFactory
var NotificationFactory = /** @class */ (function () {
    function NotificationFactory() {
    }
    NotificationFactory.createNotification = function (type) {
        switch (type) {
            case "Email":
                return new EmailNotification();
            case "SMS":
                return new SMSNotification();
            case "Push":
                return new PushNotification();
            default:
                throw new Error("Unknown notification type: ".concat(type));
        }
    };
    return NotificationFactory;
}());
// ✅ Usage
var notifier = NotificationFactory.createNotification("Email");
notifier.send("Welcome!");
// Output: Sending EMAIL: Welcome!
var smsNotifier = NotificationFactory.createNotification("SMS");
smsNotifier.send("Your OTP is 123456");
// Output: Sending SMS: Your OTP is 123456
var pushNotifier = NotificationFactory.createNotification("Push");
pushNotifier.send("You have a new message!");
// Output: Sending PUSH: You have a new message!
