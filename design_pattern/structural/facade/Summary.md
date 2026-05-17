# Summary

## About
- **Facade Pattern (Structural)**: Provides a simplified, unified interface to a complex subsystem. It hides the underlying complexity and dependencies of the system from the client code.
- Instead of making your code interact directly with dozens of classes, you create a "Facade" class that provides a simple method (like `startComputer()`) which orchestrates the complex logic internally.

## Resources
- [Refactoring Guru - Facade](https://refactoring.guru/design-patterns/facade)
- [YouTube Link - Facade](https://www.youtube.com/watch?v=0KlnSdvsojc)

## My Notes
- **Not a God Object**: A Facade is not a God Object because it doesn't *implement* the business logic; it merely *delegates* and *orchestrates* it. The subsystems still do the actual work.
- **Dependency Injection (DIP)**: A robust Facade shouldn't hardcode `new Subsystem()` in its constructor. Passing subsystems into the constructor allows the Facade to be tested in isolation using mocks (e.g., Mocking a DB connection or a File System).
- **Multiple Facades**: A complex system might have multiple Facades for different client needs, rather than one massive Facade for everything.

### Tradeoffs / Pros & Cons
**Pros**:
1. **Isolation**: Isolates clients from the complexity of subsystem components.
2. **Reduced Coupling**: Promotes weak coupling between the subsystem and its clients.
3. **Better Structuring**: Helps layer the subsystems and provides a clear entry point to each layer.

**Cons**:
1. **The God Object Risk**: If poorly designed (i.e., if you start putting business logic *inside* the Facade instead of delegating), it can quickly become a God Object tightly coupled to every class of an app.
2. **Limited Access**: Power users might find the Facade too restrictive if they need to access advanced subsystem features (though they can usually bypass the Facade and use the subsystem directly).

## Examples Solved
- **Computer Boot Sequence**: Created a `ComputerFacade` that hides the complex interactions between `CPU`, `Memory`, `HardDrive`, `PowerSupply`, and `BIOS` behind a single `startComputer()` method. Refactored to use Dependency Injection to prevent tight coupling and allow for mocking.
