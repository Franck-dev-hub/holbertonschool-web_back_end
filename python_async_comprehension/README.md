# Asynchronous Generators and Type Annotations in Python
## How to Write an Asynchronous Generator
An asynchronous generator is a function that uses `async def` and contains `await` expressions along with `yield` statements.
It allows you to produce values asynchronously, pausing execution and resuming later.

**Basic Syntax:**
```python
async def async_generator_name():
    # yield statements with async operations
    yield value
```

**Key Points:**
- Use `async def` to define the generator function
- Use `await` to pause execution for async operations
- Use `yield` to produce values
- Iterate with `async for` loop
- Returns an async generator object that produces values asynchronously

## How to Use Async Comprehensions
Async comprehensions allow you to create lists, sets, dictionaries, and generators using `async for` and `await` expressions in a concise, readable way.

**Key Points:**
- Use `async for` in comprehensions to iterate over async iterables
- Use `await` to get results from async operations
- Syntax: `[expression async for item in async_iterable if condition]`
- Works with lists, sets, dicts, and generator expressions
- More concise and readable than traditional loops

## How to Type-Annotate Generators
Type annotations for generators use the `Generator` type from the `typing` module, or `AsyncGenerator` for async generators.

**Key Points:**
- Use `Generator[YieldType, SendType, ReturnType]` for sync generators
- Use `AsyncGenerator[YieldType, SendType]` for async generators
- Use `Iterator[T]` as shorthand when only caring about yielded values
- First parameter is what the generator yields
- Second parameter is what can be sent to the generator via `.send()`
- Third parameter (sync only) is the return type
- Always annotate function parameters and return types for clarity
