// Observer interface
interface Observer {
  update(): void;
}

// Concrete Observers
class Smartphone implements Observer {
  update(): void {
    console.log("Smartphone received notification");
  }
}

class Tablet implements Observer {
  update(): void {
    console.log("Tablet received notification");
  }
}

// Subject
class NotificationCenter {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
    console.log(`Observer added: ${observer.constructor.name}`);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
    console.log(`Observer removed: ${observer.constructor.name}`);
  }

  notify(): void {
    this.observers.forEach(observer => observer.update());
  }
}

// Main
const notificationCenter = new NotificationCenter();

const phone = new Smartphone();
const tablet = new Tablet();

notificationCenter.attach(phone);
notificationCenter.attach(tablet);

notificationCenter.notify();
