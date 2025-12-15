# JavaScript Guide: Arrays, Typed Arrays and Data Structures
## 1 Map, Filter and Reduce on Arrays
### Map
Transforms each element of an array and returns a new array with the results.

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8]
```

### Filter
Creates a new array with only the elements that pass a test.

```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```

### Reduce
Reduces an array to a single value by applying an accumulator function.

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 10

// More complex example
const products = [
  { name: 'Apple', price: 1.5 },
  { name: 'Banana', price: 0.8 }
];
const total = products.reduce((sum, p) => sum + p.price, 0);
console.log(total); // 2.3
```

## 2. Typed Arrays
Typed arrays allow you to work with binary data efficiently and with high performance.

### Available Types
- `Int8Array`, `Uint8Array`, `Uint8ClampedArray`
- `Int16Array`, `Uint16Array`
- `Int32Array`, `Uint32Array`
- `Float32Array`, `Float64Array`
- `BigInt64Array`, `BigUint64Array`

### Examples
```javascript
// Create a typed array
const buffer = new ArrayBuffer(16); // 16 bytes
const view = new Uint32Array(buffer); // 4 x 32-bit integers

view[0] = 42;
view[1] = 100;
console.log(view); // Uint32Array [ 42, 100, 0, 0 ]

// Typed array directly
const floats = new Float32Array([1.5, 2.3, 3.7]);
console.log(floats[0]); // 1.5
```

### Use Cases
- Image and audio processing
- High-performance numerical computations
- Communication with binary APIs
- WebGL and graphics

## 3 Set, Map and WeakMap
### Set
Stores **unique values**. No keys, only values.

```javascript
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set); // Set { 1, 2, 3 }

set.add(4);
set.has(2); // true
set.delete(1);
console.log(set.size); // 3

// Useful for removing duplicates
const unique = [...new Set([1, 2, 2, 3, 3])];
console.log(unique); // [1, 2, 3]
```

### Map
Stores **key-value pairs** with any type as a key.

```javascript
const map = new Map();

// Keys can be any type
map.set('name', 'Alice');
map.set(1, 'one');
map.set({ id: 1 }, 'object key');

console.log(map.get('name')); // 'Alice'
console.log(map.has(1)); // true
map.delete('name');
console.log(map.size); // 2

// Iteration
for (const [key, value] of map) {
  console.log(`${key} => ${value}`);
}
```

### WeakMap
Similar to Map, but only stores objects and references are "weak".

```javascript
const weakMap = new WeakMap();
let obj = { id: 1 };

weakMap.set(obj, 'some data');
console.log(weakMap.get(obj)); // 'some data'

// If obj is deleted, the WeakMap releases it too
obj = null; // The entry can be garbage collected

// Advantages: saves memory, ideal for metadata
```

### WeakSet
Similar to Set but for objects only and with weak references.

```javascript
const weakSet = new WeakSet();
let obj = { id: 1 };

weakSet.add(obj);
console.log(weakSet.has(obj)); // true
```

## When to Use What?

| Use Case | Structure |
|---|---|
| Unique values | **Set** |
| Key-value pairs | **Map** |
| Metadata on objects | **WeakMap** |
| High-performance binary data | **Typed Arrays** |
| Transform an array | **map()** |
| Filter an array | **filter()** |
| Accumulate a value | **reduce()** |
