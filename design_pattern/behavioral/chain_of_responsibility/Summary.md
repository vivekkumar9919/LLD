# Summary

## About
- **Chain of Responsibility Pattern (Behavioral)**: Lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process it or to pass it to the next handler in the chain.
- It decouples the sender of a request from its receiver, giving multiple objects a chance to handle the request.

## Resources
- [Refactoring Guru - Chain of Responsibility](https://refactoring.guru/design-patterns/chain-of-responsibility)

## My Notes
- **Variations of CoR**: 
  - *Standard*: The chain stops as soon as one handler successfully processes the request (e.g., Event Bubbling in the DOM, or an Authentication Middleware).
  - *Filter / Accumulator*: The request is passed through ALL handlers, and each handler takes a "piece" of the request or modifies it (e.g., The ATM Dispenser taking out notes and passing the remainder down, or an Express.js middleware pipeline).
- **Template Method Synergy**: To avoid DRY violations when handlers share identical logic, define a Template Method in the base `Handler` class, and only pass the variables (like denomination) from the subclasses.
- **Handling Failure**: If a request reaches the end of the chain unhandled, it MUST NOT fail silently. Always throw an Exception or return a definitive Error response so the client knows the chain failed.
- **Dynamic Chains**: The biggest advantage over a massive `if-else` or `switch` statement is that the chain is configured at runtime. A Dispatcher can dynamically insert, remove, or reorder handlers based on the current state of the application.

### Tradeoffs / Pros & Cons
**Pros**:
1. **Single Responsibility Principle**: You can decouple classes that invoke operations from classes that perform operations.
2. **Open/Closed Principle**: You can introduce new handlers into the app without breaking existing client code.
3. **Control over order**: You can easily control the order of request handling.

**Cons**:
1. **Uncertainty**: Some requests may end up unhandled if the chain is not configured properly or lacks a "catch-all" fallback handler at the end.
2. **Debugging**: It can be hard to trace the execution flow and figure out which handler processed the request or where it got dropped.

## Examples Solved
- **ATM Dispenser**: Created a `MoneyHandler` base class that defines a `dispenseLogic` template method. Created concrete handlers (`ThousandHandler`, `FiveHundredHandler`, `TwoHundredHandler`) that take their respective inventory counts in the constructor. The handlers are linked via `setNextHandler`. An amount (e.g., 1700) cascades down the chain, with each handler dispensing what it can and passing the remainder to the next.
