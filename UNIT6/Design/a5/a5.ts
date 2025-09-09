abstract class Beverage {
  abstract getDescription(): string;
  abstract getCost(): number;
}

class Coffee extends Beverage {
  getDescription(): string {
    return "Coffee";
  }
  getCost(): number {
    return 50;
  }
}

class Sugar extends Beverage {
  private beverage: Beverage;
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }
  getDescription(): string {
    return this.beverage.getDescription() + " + Sugar";
  }
  getCost(): number {
    return this.beverage.getCost() + 10;
  }
}

class Honey extends Beverage {
  private beverage: Beverage;
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }
  getDescription(): string {
    return this.beverage.getDescription() + " + Honey";
  }
  getCost(): number {
    return this.beverage.getCost() + 20;
  }
}

class WhippedCream extends Beverage {
  private beverage: Beverage;
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }
  getDescription(): string {
    return this.beverage.getDescription() + " + WhippedCream";
  }
  getCost(): number {
    return this.beverage.getCost() + 15;
  }
}

const myDrink = new WhippedCream(new Honey(new Sugar(new Coffee())));
console.log(myDrink.getDescription());
console.log(myDrink.getCost());
