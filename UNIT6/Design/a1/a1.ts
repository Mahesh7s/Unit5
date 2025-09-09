// Abstract class Beverage
abstract class Beverage {
  abstract getDescription(): string;
  abstract getCost(): number;
}

// Concrete class GreenTea
class GreenTea extends Beverage {
  getDescription(): string {
    return "Green Tea";
  }

  getCost(): number {
    return 40;
  }
}

// ✅ Test
const tea = new GreenTea();
console.log(tea.getDescription()); // Green Tea
console.log(tea.getCost());        // 40
