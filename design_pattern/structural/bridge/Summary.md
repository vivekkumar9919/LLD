# Summary

## About
- **Bridge Pattern (Structural)**: Decouples an abstraction from its implementation so that the two can vary independently. 
- It prevents a **Cartesian Product** class explosion (e.g., $N$ abstractions $\times$ $M$ implementations) by transforming inheritance into composition.

## Resources
- [Refactoring Guru - Bridge](https://refactoring.guru/design-patterns/bridge)

## My Notes
- **Bridge vs Strategy**: They look structurally identical (injecting an interface into a class via constructor). However, their *intent* is different.
  - *Strategy* (Behavioral): Swapping different algorithms to solve the *same* problem (e.g., CreditCard vs PayPal).
  - *Bridge* (Structural): Decoupling two completely different, independently evolving *domain concepts* (e.g., A GUI Window vs an OS-specific Window implementation, or a Car vs an Engine).

### Tradeoffs / Pros & Cons
**Pros**:
1. **Avoids Class Explosion**: Prevents the exponential growth of classes when two independent dimensions of an object need to be extended.
2. **Open/Closed Principle**: You can introduce new abstractions and implementations independently from each other.
3. **Single Responsibility Principle**: You can focus on high-level logic in the abstraction and on platform details in the implementation.

**Cons**:
1. **Complexity**: Might make the code more complicated than simply using inheritance if the application is small and highly cohesive.

## Examples Solved
- **Car & Engine System**: Created an `Engine` interface (Implementor) with `DieselEngine`, `PetrolEngine`, and `ElectricEngine`. Created a `Car` base class (Abstraction) with `Sedan` and `SUV`. By injecting the `Engine` into the `Car`, we avoided creating classes like `SedanDiesel`, `SUVElectric`, reducing the total class count from $N \times M$ to $N + M$.
