# Python - Async Comprehension
## Project Description
This project explores asynchronous generators and asynchronous comprehensions in Python. It demonstrates how to work with asynchronous iteration patterns, collect data from async generators using comprehensions, and measure the runtime of parallel asynchronous operations.

## Learning Objectives
- Understand and implement asynchronous generators using `async def` and `yield`
- Learn how to use asynchronous comprehensions with the `async for` syntax
- Collect data from async generators efficiently using async comprehensions
- Execute multiple async operations in parallel using `asyncio.gather`
- Type-annotate generators and async comprehensions properly
- Measure and understand the runtime characteristics of concurrent async operations

## Files
- **0-async_generator.py**: Async generator that yields random numbers with delays
- **1-async_comprehension.py**: Async comprehension that collects values from an async generator
- **2-measure_runtime.py**: Measures runtime of four parallel async comprehensions

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
```

## Key Concepts
### Async Generators
Functions defined with `async def` that use `yield` to produce values asynchronously. They can pause execution and resume later, allowing for asynchronous iteration.
```python
async def async_generator():
    for i in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
```

### Async Comprehensions
Comprehensions that work with async generators using the `async for` syntax. They collect values from asynchronous iterables efficiently.
```python
[x async for x in async_generator()]
```

### Parallel Execution
Using `asyncio.gather()` to execute multiple async operations concurrently. When four 10-second operations run in parallel, the total time is still approximately 10 seconds (not 40), because they execute simultaneously.

### Type Annotations for Generators
Generators and async generators use `Generator` or `AsyncGenerator` from the `typing` module:
```python
from typing import AsyncGenerator

async def async_gen() -> AsyncGenerator[float, None]:
    # yields floats, doesn't send values back
    yield 1.0
```

## Project Structure
```
python_async_comprehension/
├── 0-async_generator.py
├── 0-main.py
├── 1-async_comprehension.py
├── 1-main.py
├── 2-measure_runtime.py
├── 2-main.py
└── README.md
```

## Notes
- Async comprehensions are a more readable way to filter and collect data from async generators
- Parallel execution with `asyncio.gather()` reduces total runtime compared to sequential execution
- Proper type annotations help with code clarity and IDE support
