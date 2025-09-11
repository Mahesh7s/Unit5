// Base Notification "interface"
class Notification {
  send(message) {
    throw new Error("send() must be implemented");
  }
}

// EmailNotification
class EmailNotification extends Notification {
  send(message) {
    console.log(`Sending EMAIL: ${message}`);
  }
}

// SMSNotification
class SMSNotification extends Notification {
  send(message) {
    console.log(`Sending SMS: ${message}`);
  }
}

// PushNotification
class PushNotification extends Notification {
  send(message) {
    console.log(`Sending PUSH: ${message}`);
  }
}

// NotificationFactory
class NotificationFactory {
  static createNotification(type) {
    switch (type) {
      case "Email":
        return new EmailNotification();
      case "SMS":
        return new SMSNotification();
      case "Push":
        return new PushNotification();
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }
  }
}

// ✅ Usage
const notifier = NotificationFactory.createNotification("Email");
notifier.send("Welcome!"); 
// Output: Sending EMAIL: Welcome!

const smsNotifier = NotificationFactory.createNotification("SMS");
smsNotifier.send("Your OTP is 123456"); 
// Output: Sending SMS: Your OTP is 123456

const pushNotifier = NotificationFactory.createNotification("Push");
pushNotifier.send("You have a new message!"); 
// Output: Sending PUSH: You have a new message!
