# ES6 JavaScript
## Table of content
- [What is ES6 ?](#what-is-es6)
- [New Features Introduced in ES6](#new-features-introduced-in-es6)
- [Constants vs Variables](#constants-vs-variables)
  - [Variables (let)](#variables-let)
  - [Constants (const)](#constants-const)
- [Block-Scoped Variables](#block-scoped-variables)
    - [Function Scope (var)](#function-scope-var)
    - [Block Scope (let and const)](#block-scope-let-and-const)
- [Arrow Functions](#arrow-functions)
    - [Basic Syntax](#basic-syntax)
    - [Lexical this Binding](#lexical-this-binding)
- [Default Parameters](#default-parameters)
- [Rest and Spread Operators](#rest-and-spread-operators)
    - [Rest Parameters (in function definition)](#rest-parameters-in-function-definition)
    - [Spread Operator (in function calls or array literals)](#spread-operator-in-function-calls-or-array-literals)
- [String Templating (Template Literals)](#string-templating-template-literals)
- [Object Creation and Properties](#object-creation-and-properties)
    - [Enhanced Object Literals](#enhanced-object-literals)
    - [Computed Property Names](#computed-property-names)
    - [Object Methods for Properties](#object-methods-for-properties)
- [Iterators and for-of Loops](#iterators-and-for-of-loops)
    - [Understanding Iterables and Iterators](#understanding-iterables-and-iterators)
    - [for-of Loop](#for-of-loop)
    - [Difference from for-in Loop](#difference-from-for-in-loop)

---

## What is ES6?
ES6, officially known as ECMAScript 2015 (ES2015), is the sixth major update to JavaScript.
Released in June 2015, it was the first major update since ES5 (2009) and introduced hundreds of new features that fundamentally changed how developers write JavaScript.
ES6 modernized the language with better syntax, improved functionality, and more intuitive ways to handle common programming tasks.

---

## New Features Introduced in ES6
ES6 brought numerous improvements to JavaScript, including:

- **let and const** - Block-scoped variable declarations
- **Arrow functions** - Shorter function syntax with lexical `this`
- **Classes** - Object-oriented programming with class syntax
- **Template literals** - String interpolation with backticks
- **Destructuring** - Extracting values from objects and arrays
- **Default parameters** - Function parameters with default values
- **Rest and spread operators** - Handling variable arguments and array spreading
- **Promises** - Better asynchronous programming
- **Modules** - Import and export for code organization
- **Enhanced object literals** - Shorthand properties and methods
- **for-of loops** - Iterating over iterable objects
- **Map and Set** - New data structures

---

## Constants vs Variables
### Variables (let)
Variables declared with `let` can be reassigned and their values can change throughout the program.

```javascript
let age = 25;
age = 26; // This is allowed
console.log(age); // 26
```

### Constants (const)
Constants declared with `const` cannot be reassigned after initialization. However, if a constant holds an object or array, the properties or elements can still be modified.

```javascript
const PI = 3.14159;
PI = 3.14; // Error: Assignment to constant variable

const person = { name: "Alice", age: 30 };
person.age = 31; // This is allowed - modifying property
person = {}; // Error: Cannot reassign constant

const numbers = [1, 2, 3];
numbers.push(4); // This is allowed - modifying array
numbers = []; // Error: Cannot reassign constant
```

**Best Practice:** Use `const` by default, `let` when you need reassignment, and avoid `var`.

---

## Block-Scoped Variables
ES6 introduced block scope with `let` and `const`. Variables are only accessible within the block where they're declared (blocks include if statements, loops, functions, and any code within curly braces).

### Function Scope (var)
```javascript
function example() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 - var leaks out of block
}
```

### Block Scope (let and const)
```javascript
function example() {
  if (true) {
    let x = 10;
    const y = 20;
  }
  console.log(x); // ReferenceError: x is not defined
  console.log(y); // ReferenceError: y is not defined
}

// Loop example
for (let i = 0; i < 3; i++) {
  // i is only accessible inside the loop
}
console.log(i); // ReferenceError: i is not defined
```

Block scope prevents variable name collisions and makes code more predictable.

---

## Arrow Functions
Arrow functions provide a concise syntax for writing functions and automatically bind the `this` keyword to the surrounding context (lexical this).

### Basic Syntax
```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => {
  return a + b;
};

// Concise arrow function (implicit return)
const add = (a, b) => a + b;

// Single parameter (parentheses optional)
const square = x => x * x;

// No parameters
const greet = () => "Hello!";
```

### Lexical this Binding
Arrow functions don't have their own `this`; they inherit it from the surrounding scope.

```javascript
const person = {
  name: "Alice",
  hobbies: ["reading", "gaming"],

  // Regular function - this refers to the object
  showHobbies() {
    this.hobbies.forEach(function(hobby) {
      console.log(this.name + " likes " + hobby); // this is undefined
    });
  },

  // Arrow function - inherits this from showHobbies
  showHobbiesArrow() {
    this.hobbies.forEach(hobby => {
      console.log(this.name + " likes " + hobby); // this refers to person
    });
  }
};

person.showHobbies(); // Error or unexpected behavior
person.showHobbiesArrow(); // Works correctly: "Alice likes reading", etc.
```

---

## Default Parameters
Default parameters allow you to specify default values for function parameters if no argument is provided.

```javascript
// Without default parameters
function greet(name) {
  name = name || "Guest"; // Old way
  console.log("Hello, " + name);
}

// With default parameters
const greet = (name = "Guest") => {
  console.log("Hello, " + name);
};

greet(); // "Hello, Guest"
greet("Alice"); // "Hello, Alice"

// Multiple default parameters
const createUser = (name = "Unknown", age = 18, role = "user") => {
  return { name, age, role };
};

createUser(); // { name: "Unknown", age: 18, role: "user" }
createUser("Bob", 25); // { name: "Bob", age: 25, role: "user" }
createUser("Charlie", 30, "admin"); // { name: "Charlie", age: 30, role: "admin" }
```

---

## Rest and Spread Operators
The three dots (`...`) serve different purposes depending on context.

### Rest Parameters (in function definition)
Rest parameters collect multiple arguments into an array.

```javascript
// Collect remaining arguments
const sum = (...numbers) => {
  return numbers.reduce((total, num) => total + num, 0);
};

sum(1, 2, 3, 4, 5); // 15

// Mix regular and rest parameters
const logInfo = (first, second, ...rest) => {
  console.log("First:", first);
  console.log("Second:", second);
  console.log("Rest:", rest);
};

logInfo("a", "b", "c", "d", "e");
// First: a
// Second: b
// Rest: ["c", "d", "e"]
```

### Spread Operator (in function calls or array literals)
The spread operator unpacks elements from an array or object.

```javascript
// Spread in function calls
const numbers = [1, 2, 3];
const max = Math.max(...numbers); // Spreads array as arguments
console.log(max); // 3

// Spread to copy arrays
const original = [1, 2, 3];
const copy = [...original];
const combined = [0, ...original, 4]; // [0, 1, 2, 3, 4]

// Spread to copy objects
const user = { name: "Alice", age: 30 };
const newUser = { ...user, age: 31 }; // { name: "Alice", age: 31 }

// Merge objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }
```

---

## String Templating (Template Literals)
Template literals use backticks and allow string interpolation with `${}` syntax. They also support multi-line strings.

```javascript
// Traditional string concatenation
const name = "Alice";
const greeting = "Hello, " + name + "!";

// Template literal
const greeting = `Hello, ${name}!`;

// Multi-line strings
const multiLine = `
  This is a template literal
  that spans multiple lines
  without needing escape characters
`;

// Expressions in templates
const a = 5;
const b = 10;
const result = `The sum of ${a} and ${b} is ${a + b}`;

// Function calls in templates
const getUser = () => "Alice";
const message = `Welcome, ${getUser()}!`;

// Tagged templates (advanced)
const highlight = (strings, ...values) => {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += `**${values[i]}**`;
    }
  }
  return result;
};

const name = "Alice";
const age = 30;
highlight`My name is ${name} and I'm ${age} years old`;
// "My name is **Alice** and I'm **30** years old"
```

---

## Object Creation and Properties
ES6 enhanced object literals with shorthand syntax and methods.

### Enhanced Object Literals
```javascript
// Shorthand properties (property name matches variable name)
const name = "Alice";
const age = 30;

// Old way
const person = {
  name: name,
  age: age
};

// ES6 shorthand
const person = { name, age };

// Shorthand methods
const person = {
  name: "Alice",
  age: 30,
  
  // Old way
  greet: function() {
    return "Hello, " + this.name;
  },
  
  // ES6 shorthand
  greet() {
    return `Hello, ${this.name}`;
  },
  
  // With arrow function (note: no 'this' binding)
  describe: () => `A person named ${person.name}`
};

person.greet(); // "Hello, Alice"
```

### Computed Property Names
```javascript
const key = "favoriteColor";
const obj = {
  [key]: "blue",
  ["computed" + "Key"]: "value"
};

console.log(obj.favoriteColor); // "blue"
console.log(obj.computedKey); // "value"
```

### Object Methods for Properties
```javascript
const obj = { a: 1, b: 2, c: 3 };

// Get all property names
const keys = Object.keys(obj); // ["a", "b", "c"]

// Get all property values
const values = Object.values(obj); // [1, 2, 3]

// Get key-value pairs
const entries = Object.entries(obj); // [["a", 1], ["b", 2], ["c", 3]]

// Destructuring from entries
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
```

---

## Iterators and for-of Loops

Iterators provide a way to access elements of a collection one at a time. The `for-of` loop works with any iterable object.

### Understanding Iterables and Iterators

An iterator is an object with a `next()` method that returns `{ value, done }`. An iterable is an object with a `Symbol.iterator` method that returns an iterator.

```javascript
// Creating a simple iterator
const countUp = {
  [Symbol.iterator]() {
    let count = 0;
    return {
      next: () => {
        count++;
        return { value: count, done: count > 3 };
      }
    };
  }
};

for (const num of countUp) {
  console.log(num); // 1, 2, 3
}
```

### for-of Loop

The `for-of` loop iterates over iterable objects (arrays, strings, Map, Set, etc.).

```javascript
// Iterate over array
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}

// Iterate over string
const word = "hello";
for (const char of word) {
  console.log(char); // h, e, l, l, o
}

// Iterate over Map
const map = new Map([["a", 1], ["b", 2]]);
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}

// Iterate over Set
const set = new Set([1, 2, 3]);
for (const item of set) {
  console.log(item);
}

// Get index with entries() on arrays
for (const [index, value] of colors.entries()) {
  console.log(`${index}: ${value}`);
}
```

### Difference from for-in Loop
```javascript
const arr = ["a", "b", "c"];
arr.customProp = "custom";

// for-in iterates over all enumerable properties (including custom ones)
for (const i in arr) {
  console.log(i); // 0, 1, 2, customProp
}

// for-of iterates over iterable values only
for (const value of arr) {
  console.log(value); // a, b, c
}
```

---**
