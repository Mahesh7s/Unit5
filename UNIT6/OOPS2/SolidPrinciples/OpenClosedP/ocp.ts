// Step 1: Define a common interface
interface ShippingStrategy {
  calculate(): number;
}

// Step 2: Create concrete strategies
class StandardShipping implements ShippingStrategy {
  calculate(): number {
    return 50;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(): number {
    return 100;
  }
}

// 🚀 Easily add new shipping types without touching existing code
class OvernightShipping implements ShippingStrategy {
  calculate(): number {
    return 150;
  }
}

// Step 3: Shipping context uses a strategy
class Shipping {
  private strategy: ShippingStrategy;

  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  calculate(): number {
    return this.strategy.calculate();
  }
}
const standard = new Shipping(new StandardShipping());
console.log(standard.calculate()); // 50

const express = new Shipping(new ExpressShipping());
console.log(express.calculate()); // 100

const overnight = new Shipping(new OvernightShipping());
console.log(overnight.calculate()); // 150
