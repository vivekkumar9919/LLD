# Summary

## About
- **Decorator Pattern (Structural)**: Attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.
- It uses object composition instead of inheritance to wrap the original object in a "Decorator" class that shares the same interface.

## Resources
- [YouTube Video Link](https://www.youtube.com/watch?v=Z9rFlZClYNI)
- [Refactoring Guru - Decorator](https://refactoring.guru/design-patterns/decorator)

## My Notes
- **Liskov Substitution Principle (LSP)**: The Decorator MUST implement the same interface or extend the same base class as the decorated object. This ensures the client doesn't know it's talking to a decorated object.
- **Base Decorator**: It's crucial to have an abstract Base Decorator class that holds the reference to the wrapped object and delegates calls to it. Concrete decorators extend this base class.
- **Composition over Inheritance**: Prevents class explosion (e.g., instead of `MarioWithGun`, `MarioWithHeight`, `MarioWithGunAndHeight`, you just compose them at runtime).

### Tradeoffs / Pros & Cons
**Pros**:
1. **Dynamic Extension**: Add or remove responsibilities from an object at runtime without affecting other objects.
2. **SRP Compliant**: Divide monolithic classes into several smaller classes, each representing a specific behavior.
3. **Alternative to Subclassing**: Avoids "Inheritance Hell" / Class explosion.

**Cons**:
1. **Complexity**: Can result in a system with many small, similar-looking objects that are hard to debug.
2. **Instantiation Boilerplate**: Creating the deeply nested wrapped object (e.g., `new GunPower(new HeightUp(new Mario()))`) can look ugly (often mitigated by using a Builder or Factory).
3. **LSP Traps**: If clients rely heavily on concrete types (using `instanceof`), decorators can break the logic if not implemented perfectly.

## Examples Solved
- **Character Power-Ups**: Implemented a `Character` base class, a concrete `Mario`, and an abstract `CharacterDecorator`. Created `HeightUp` and `GunPower` decorators to dynamically add abilities to the character.
