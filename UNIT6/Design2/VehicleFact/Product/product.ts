// Base Product class
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getDescription() {
    throw new Error("getDescription() must be implemented");
  }
}

// Laptop class
class Laptop extends Product {
  getDescription() {
    return `Laptop: ${this.name}, Price: $${this.price}`;
  }
}

// Mobile class
class Mobile extends Product {
  getDescription() {
    return `Mobile: ${this.name}, Price: $${this.price}`;
  }
}

// Tablet class
class Tablet extends Product {
  getDescription() {
    return `Tablet: ${this.name}, Price: $${this.price}`;
  }
}

// 🔹 Class Map (pluggable strategy)
const productMap = {
  Laptop: Laptop,
  Mobile: Mobile,
  Tablet: Tablet
};

// ProductFactory (does not change when new products are added)
class ProductFactory {
  static createProduct(type, name, price) {
    const ProductClass = productMap[type];
    if (!ProductClass) throw new Error(`Unknown product type: ${type}`);
    return new ProductClass(name, price);
  }
}

// ✅ Usage
const laptop = ProductFactory.createProduct("Laptop", "MacBook Pro", 2500);
console.log(laptop.getDescription());
// Output: Laptop: MacBook Pro, Price: $2500

const mobile = ProductFactory.createProduct("Mobile", "iPhone 15", 1500);
console.log(mobile.getDescription());
// Output: Mobile: iPhone 15, Price: $1500

const tablet = ProductFactory.createProduct("Tablet", "Galaxy Tab", 1100);
console.log(tablet.getDescription());
// Output: Tablet: Galaxy Tab, Price: $1100

// 🔹 Adding a new product dynamically (no factory change)
class SmartWatch extends Product {
  getDescription() {
    return `SmartWatch: ${this.name}, Price: $${this.price}`;
  }
}

// Register new product
productMap.SmartWatch = SmartWatch;

const watch = ProductFactory.createProduct("SmartWatch", "Apple Watch", 800);
console.log(watch.getDescription());
// Output: SmartWatch: Apple Watch, Price: $800
