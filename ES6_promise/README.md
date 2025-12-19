# Promises and Async/Await Guide
## What are Promises?
A **Promise** is an object that represents something that will happen in the future. It's used for operations that take time, like fetching data from a server or reading a file.

A Promise can be in three states:
- **Pending**: Still waiting for the operation to finish
- **Fulfilled**: The operation succeeded
- **Rejected**: The operation failed

```javascript
const promise = new Promise((resolve, reject) => {
  // resolve('success') - operation succeeded
  // reject('error') - operation failed
});
```

---

## Why use Promises?
Without Promises, you'd have deeply nested callbacks (callback hell). Promises make asynchronous code cleaner and easier to read.

---

## `.then()`, `.catch()`, and `.resolve()`

### `.then()` What to do when it succeeds
```javascript
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data));
```

You can chain multiple `.then()` calls. Each one receives the result from the previous one.

### `.catch()` What to do if it fails
```javascript
fetch('/api/users')
  .catch(error => console.log('Error:', error));
```

Any error in the Promise chain will be caught here.

### `.resolve()` Create an already-resolved Promise
```javascript
Promise.resolve('Done!').then(result => console.log(result)); // 'Done!'
```

---

## Promise Methods
### `Promise.all()` Wait for ALL promises
If you need to fetch multiple things, use `Promise.all()`. It waits for everything to finish. If ONE fails, everything fails.

```javascript
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts')
]).then(results => console.log('Both loaded!'));
```

### `Promise.race()` First one wins
Returns the result of whichever promise finishes first.

```javascript
Promise.race([promise1, promise2]).then(result => console.log(result));
```

### `Promise.allSettled()` Wait for all, regardless of success
Waits for all promises to finish, whether they succeed or fail.

```javascript
Promise.allSettled([promise1, promise2]).then(results => {
  // All completed, check each one individually
});
```

---

## Throw / Try
### `throw` Trigger an error manually
```javascript
if (!user) throw new Error('User not found!');
```

### `try / catch` Catch errors in async code
```javascript
try {
  const data = await fetch('/api/user');
} catch (error) {
  console.log('Something went wrong:', error);
}
```

---

## The `await` Operator
`await` pauses the code and waits for a Promise to finish. It only works inside an `async` function.

Instead of writing `.then()` chains, you can write code that looks synchronous:

```javascript
// With .then()
fetch('/api/user')
  .then(response => response.json())
  .then(data => console.log(data));

// With await (much cleaner!)
const response = await fetch('/api/user');
const data = await response.json();
console.log(data);
```

---

## Async Functions
An `async` function automatically returns a Promise and lets you use `await` inside it.

```javascript
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data; // Automatically wrapped in a Promise
}

// Use it
getUser(1).then(user => console.log(user));
```

### Error handling
```javascript
async function getUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    return await response.json();
  } catch (error) {
    console.log('Error:', error);
  }
}
```

### Fetch multiple things in parallel
```javascript
async function loadData() {
  // Run all at the same time (faster!)
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  
  return { users, posts };
}
```

---
