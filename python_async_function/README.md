# Python - Async
## Project Description
This project explores asynchronous programming in Python using the `asyncio` module. It covers the fundamentals of async/await syntax, concurrent coroutine execution, task creation, and runtime measurement for asynchronous operations.

## Learning Objectives
- Understand and implement `async` and `await` syntax
- Execute async programs using the `asyncio` module
- Run multiple coroutines concurrently
- Create and manage asyncio tasks
- Use the `random` module for generating random delays
- Measure execution time of asynchronous operations

## Files
- **0-basic_async_syntax.py**: Basic async coroutine that waits for a random delay
- **1-concurrent_coroutines.py**: Execute multiple coroutines concurrently and return sorted delays
- **2-measure_runtime.py**: Measure the execution time of async operations
- **3-tasks.py**: Create asyncio Task objects from coroutines
- **4-tasks.py**: Execute multiple tasks concurrently with sorted results

## Requirements
- Python 3.9 on Ubuntu 20.04 LTS
- All files must be executable
- Code must pass pycodestyle (2.5.x) validation
- All functions and coroutines must have type annotations
- All modules and functions must have proper documentation

## Usage
Run the main test files to see the functionality in action:
```bash
./0-main.py
./1-main.py
./2-main.py
./3-main.py
./4-main.py
```

## Key Concepts
### Async/Await
Asynchronous programming allows concurrent execution of I/O-bound operations without blocking the main thread.

### Coroutines
Functions defined with `async def` that can be paused and resumed, allowing other code to run in between.

### Tasks
Wrappers around coroutines that schedule them for execution in the event loop using `asyncio.create_task()`.

### Concurrency
Using `asyncio.gather()` to run multiple coroutines simultaneously and collect their results.
