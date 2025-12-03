# Type Annotations and Type Checking in Python 3
## Type Annotations in Python 3
Type annotations specify the expected types of variables and function parameters using the syntax `: type`.
They are optional and not enforced at runtime, but they improve code readability and enable static type checking.

**Basic Syntax:**
- Variables: `name: str = "Alice"`
- Functions: `def greet(name: str, age: int) -> str:`
- Built-in types: `int`, `float`, `str`, `bool`, `list`, `dict`, `set`, `tuple`

Type annotations are purely informational. Python will run code that violates them without error. They serve as documentation and work with type checking tools.

## Function Signatures and Variable Types
Type annotations make function signatures explicit contracts about what types are expected and returned.

**Generic Types** from the `typing` module specify element types:
- `List[int]` - list of integers
- `Dict[str, int]` - dictionary with string keys and integer values
- `Tuple[int, str]` - tuple with specific types per position
- `Set[str]` - set of strings

**Optional and Union Types:**
- `Optional[str]` - can be `str` or `None` (equivalent to `Union[str, None]`)
- `Union[int, str]` - can be `int` or `str`

**Type Aliases** simplify complex types:
```python
UserId = int
UserData = Dict[str, str]
```

**Callable Types** describe functions as parameters:
- `Callable[[int, int], int]` - function taking two ints, returning int

Type annotations are self-documenting and help IDEs provide better autocomplete and error detection.

## Duck Typing
Duck typing means an object's capabilities matter more than its type.
"If it walks like a duck and quacks like a duck, it's a duck."

**Key principle:** If an object has the required methods, it can be used regardless of its actual class. No explicit inheritance or interface declaration needed.

**Examples:**
- Any object with `__iter__()` can be used in a `for` loop
- Any object with `read()` and `close()` can be used as a file
- Any object with `speak()` can be passed to a function expecting something that speaks

**Trade-offs:**
- Flexibility: code works with any compatible object
- Risk: contracts are implicit; missing methods only discovered at runtime

**Protocols** formalize duck typing by defining required methods without requiring inheritance. Type checkers verify compatibility without explicit inheritance declarations.

## How to Validate Your Code with `mypy`
`mypy` is a static type checker that analyzes code without running it, catching type mismatches before runtime.

**Installation and Usage:**
```bash
pip install mypy
mypy script.py          # Check single file
mypy src/               # Check directory
mypy --strict script.py # Strict mode
```

**What mypy catches:**
- Wrong argument types passed to functions
- Return type violations
- Attribute access on non-existent attributes
- Incompatible operations
- Generic type mismatches

**Strictness Levels:**
- Default: reasonable checking, unannotated functions allowed
- `--strict`: requires all annotations, catches more edge cases
- `--check-untyped-defs`: checks function bodies even without annotations

**Configuration** via `mypy.ini` or `setup.cfg`:
```ini
[mypy]
python_version = 3.9
disallow_untyped_defs = True
strict_optional = True
```

**Gradual Typing:** Add annotations incrementally. Functions without annotations are checked less strictly, allowing partial coverage during migration.

**`Any` Type:** Represents "any type accepted." Used when type information is unavailable. Disables type checking for that value, use sparingly.

**`# type: ignore`:** Skip type checking for a specific line when intentionally violating the type system.

**Error Messages:**
- `Incompatible types in assignment` - assigning wrong type to variable
- `Argument has incompatible type` - function called with wrong argument type
- `Missing return statement` - function doesn't always return a value

mypy catches errors during development before code runs, making it valuable for maintaining code quality in larger projects.
