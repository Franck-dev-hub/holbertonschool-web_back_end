# Async/Await, AsyncIO, and Random Module in Python
## `async` and `await` Syntax
The `async` and `await` keywords enable asynchronous programming in Python, allowing functions to pause and resume execution without blocking the entire program.

**Basic Syntax:**
```python
async def async_function():
    """An async function (coroutine)"""
    await some_async_operation()
    return result
```

**Key Points:**
- Use `async def` to define a coroutine function
- Use `await` to pause execution and wait for an async operation to complete
- `await` can only be used inside async functions
- Awaiting pauses the current coroutine but allows other coroutines to run
- Always `await` a coroutine before using its result

## How to Execute an Async Program with `asyncio`
The `asyncio.run()` function is the main entry point for running async programs.
It creates an event loop and executes a coroutine.

**Basic Execution:**
```python
import asyncio

async def main():
    print("Program started")
    await asyncio.sleep(1)
    print("Program ended")

# Execute the async program
asyncio.run(main())
```

**Key Points:**
- Use `asyncio.run()` as the entry point for async programs
- It automatically creates and manages the event loop
- Returns the result of the awaited coroutine
- Should only be called once per program (at the top level)
- Handles cleanup and closes the event loop automatically

## How to Run Concurrent Coroutines
Concurrent execution allows multiple coroutines to run at the same time (in an interleaved fashion), improving efficiency.

**Key Points:**
- Use `asyncio.gather()` to run multiple coroutines concurrently and wait for all to complete
- All coroutines start almost immediately and run in an interleaved manner
- Returns a list of results in the same order as the input coroutines
- Use `return_exceptions=True` to handle exceptions without stopping execution
- Concurrent execution is much faster than sequential for I/O-bound operations

## How to Create `asyncio` Tasks
Tasks are a way to schedule coroutines to run concurrently.
A task wraps a coroutine and allows more control over its execution.

**Key Points:**
- Use `asyncio.create_task()` to schedule a coroutine to run concurrently
- Tasks start immediately when created (in the event loop)
- Use `await` to wait for a task to complete
- Check task status with `.done()`, get result with `.result()`
- Tasks can be cancelled with `.cancel()`
- Use `asyncio.wait()` for fine-grained control over task completion

## How to Use the `random` Module
The `random` module provides functions to generate random numbers and perform random operations.

**Common Random Functions Reference:**
```python
import random

# Integers
random.randint(a, b)              # Random integer N such that a <= N <= b
random.randrange(a, b, step)      # Like range but returns random element
random.getrandbits(k)             # Random integer with k random bits

# Floats
random.random()                   # Random float in [0.0, 1.0)
random.uniform(a, b)              # Random float N such that a <= N <= b
random.expovariate(lambd)         # Exponential distribution
random.gauss(mu, sigma)           # Normal distribution (mean, std dev)

# Sequences
random.choice(seq)                # Random element from non-empty sequence
random.choices(seq, k)            # k elements with replacement
random.sample(seq, k)             # k unique elements without replacement
random.shuffle(list)              # Shuffle list in place
random.random()                   # Random float [0.0, 1.0)

# Seed
random.seed(a)                    # Initialize random number generator
random.getstate()                 # Get current state
random.setstate(state)            # Restore state
```

**Key Points:**
- Use `random.randint(a, b)` for random integers in a range (inclusive)
- Use `random.choice()` to pick one random element from a sequence
- Use `random.choices()` for multiple picks with replacement
- Use `random.sample()` for multiple picks without replacement
- Use `random.shuffle()` to randomize a list in place
- Set a seed with `random.seed()` for reproducible results
- Common in games, simulations, testing, and async task delays
