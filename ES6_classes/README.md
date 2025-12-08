# JavaScript Classes Guide
## Table of Contents
- [Defining a Class](#defining-a-class)
- [Adding Methods to a Class](#adding-methods-to-a-class)
- [Static Methods](#static-methods)
- [Class Inheritance](#class-inheritance)
- [Metaprogramming and Symbols](#metaprogramming-and-symbols)

---

## Defining a Class
A class is a blueprint for creating objects. Use the `class` keyword to define it.

```javascript
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
}

const myCar = new Car('Toyota', 'Camry');
console.log(myCar.brand); // Toyota
```

The `constructor` method is called automatically when you create an instance with `new`.

---

## Adding Methods to a Class
Methods are functions that belong to a class instance.

```javascript
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  describe() {
    return `${this.brand} ${this.model}`;
  }

  start() {
    console.log('Engine started');
  }
}

const myCar = new Car('Toyota', 'Camry');
myCar.describe(); // "Toyota Camry"
myCar.start();    // "Engine started"
```

---

## Static Methods
Static methods belong to the class itself, not to instances.  
They are useful for functionality that doesn't depend on a specific instance.

```javascript
class Car {
  static getNumberOfWheels() {
    return 4;
  }

  static fromString(str) {
    const [brand, model] = str.split('-');
    return new Car(brand, model);
  }
}

console.log(Car.getNumberOfWheels()); // 4
const car = Car.fromString('Toyota-Camry');
```

**Why use static methods?**
- Factory methods to create instances
- Utility functions related to the class
- Constants and shared logic

---

## Class Inheritance
Extend a class to inherit its properties and methods.

```javascript
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }

  describe() {
    return `Brand: ${this.brand}`;
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super(brand); // Call parent constructor
    this.model = model;
  }

  describe() {
    return `${super.describe()} - Model: ${this.model}`;
  }
}

const myCar = new Car('Toyota', 'Camry');
console.log(myCar.describe()); // "Brand: Toyota - Model: Camry"
```

Use `super()` to call the parent constructor and `super.method()` to call parent methods.

---

## Metaprogramming and Symbols
Symbols are unique, immutable values used to create hidden properties and control object behavior.

### Private Properties with Symbols
```javascript
const id = Symbol('id');

class Person {
  constructor(name) {
    this.name = name;
    this[id] = Math.random(); // Hidden property
  }

  getId() {
    return this[id];
  }
}

const person = new Person('Alice');
console.log(person.name);   // Alice
console.log(person[id]);    // 0.123... (only accessible with the Symbol)
```

### Custom Iterators
```javascript
class Team {
  constructor(members) {
    this.members = members;
  }

  [Symbol.iterator]() {
    let index = 0;
    const members = this.members;
    return {
      next() {
        if (index < members.length) {
          return { value: members[index++], done: false };
        }
        return { done: true };
      },
    };
  }
}

const team = new Team(['Alice', 'Bob', 'Charlie']);
for (const member of team) {
  console.log(member); // Alice, Bob, Charlie
}
```

### Common Symbols
- `Symbol.iterator` -> Makes an object iterable
- `Symbol.toStringTag` -> Customizes `toString()` output
- `Symbol.hasInstance` -> Controls `instanceof` behavior
