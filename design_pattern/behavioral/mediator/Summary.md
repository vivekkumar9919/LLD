# Mediator Design Pattern Summary

## About
The **Mediator Design Pattern** is a behavioral design pattern that reduces chaotic dependencies between objects (colleagues). It restricts direct communications between the objects and forces them to collaborate only via a central mediator object.

## Pros & Cons
### Pros
- **Reduces Coupling:** Replaces many-to-many relationships with cleaner one-to-many relationships, making components highly reusable and independent.
- **Single Responsibility Principle (SRP):** Centralizes communication logic and routing controls into a single coordinator class.
- **Open/Closed Principle (OCP):** You can introduce new mediators or modify routing rules without changing the individual colleague classes.
- **Simplifies Component Maintenance:** Colleagues do not need to keep track of other colleagues' references or life cycles.

### Cons
- **God Object Risk:** Over time, the mediator can easily evolve into a monolithic controller containing too much complex routing and orchestration logic, making it extremely hard to maintain.
- **Central Point of Failure:** If the mediator goes down or has bugs, the entire communication network between components breaks.

## Tradeoffs
- **Complexity vs. Coupling:** You trade a web of tightly-coupled, simple objects (spaghetti dependencies) for a single, complex coordinator object. If the interactions between objects are minimal, introducing a mediator adds unnecessary abstraction and overhead.
- **Maintainability vs. Performance:** Decoupling objects via a mediator makes features easier to extend, but introduces indirect calls. If the mediator performs heavy-weight routing (such as searching linear arrays or filtering multiple states), it can degrade communication throughput compared to direct communication.

## Resources
- [YouTube Video Link](https://www.youtube.com/watch?v=3lGIICzgyQQ)
- [Refactoring Guru - Mediator Pattern](https://refactoring.guru/design-patterns/mediator)

## My Notes
- Use a **Map** (`Map<string, Colleague>`) instead of a linear array to optimize colleague lookup to $O(1)$ in the mediator.
- Ensure interface integrity: avoid exposing domain-specific features (like `mute` or `unmute`) directly on the concrete mediator class without exposing them through the `IMediator` interface to respect the **Dependency Inversion Principle (DIP)**.
- Colleagues should expose clean interfaces to receive messages/events without depending on how the mediator routes them.

## Examples Solved
- **Chat Room Mediator:** Broadcast and private chat rooms with mute/unmute capabilities.
