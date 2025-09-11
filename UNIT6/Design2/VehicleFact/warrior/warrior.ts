// Base Character class (acts as an interface)
class Character {
  constructor(name) {
    this.name = name;
  }

  getStats() {
    throw new Error("getStats() must be implemented");
  }
}

// Warrior class
class Warrior extends Character {
  getStats() {
    return `Warrior ${this.name} - Strength: 90, Defense: 80`;
  }
}

// Archer class
class Archer extends Character {
  getStats() {
    return `Archer ${this.name} - Agility: 80, Strength: 40`;
  }
}

// Mage class
class Mage extends Character {
  getStats() {
    return `Mage ${this.name} - Intelligence: 90, Mana: 100`;
  }
}

// CharacterFactory
class CharacterFactory {
  static createCharacter(type, name) {
    switch (type) {
      case "Warrior":
        return new Warrior(name);
      case "Archer":
        return new Archer(name);
      case "Mage":
        return new Mage(name);
      default:
        throw new Error(`Unknown character type: ${type}`);
    }
  }
}


const archer = CharacterFactory.createCharacter("Archer", "Eldrin");
console.log(archer.getStats());
// Output: Archer Eldrin - Agility: 80, Strength: 40

const mage = CharacterFactory.createCharacter("Mage", "Gandalf");
console.log(mage.getStats());
// Output: Mage Gandalf - Intelligence: 90, Mana: 100

const warrior = CharacterFactory.createCharacter("Warrior", "Thorin");
console.log(warrior.getStats());
// Output: Warrior Thorin - Strength: 90, Defense: 80
