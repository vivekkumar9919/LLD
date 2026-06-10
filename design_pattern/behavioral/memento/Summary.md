# Memento Design Pattern Summary

## About
The **Memento Design Pattern** is a behavioral design pattern that lets you save and restore the previous state of an object (Originator) without revealing the details of its implementation (encapsulation).

## Pros & Cons
### Pros
- **Preserves Encapsulation:** You can capture snapshots of an object's internal state without violating its encapsulation boundaries (i.e. clients or caretakers do not need direct access to internal fields).
- **Simplifies Originator Code:** The caretaker manages the history stack of states, freeing the originator from tracking backup states.
- **Easy Undo/Redo:** Provides a natural fit for features requiring multi-step undo, rollback, or history tracking.

### Cons
- **High Memory Footprint:** If the state is large or snapshots are frequent, storing mementos can consume massive amounts of memory.
- **Garbage Collection Overhead:** Creating and deleting mementos frequently puts pressure on memory management systems.
- **Extra Caretaker Complexity:** The caretaker must track the originator's lifecycle to ensure dead mementos are cleaned up and do not leak memory.

## Tradeoffs
- **State Size vs. Frequency:** Storing full snapshots of data on every operation is simple but expensive. You trade off memory efficiency for simplicity. To optimize, you can switch to *incremental changes/deltas* (only storing state modifications), which reduces memory usage but increases implementation complexity.
- **Tight vs. Loose Encapsulation:** In JavaScript, enforcing private state encapsulation on Mementos is tricky because of the lack of packaging mechanisms. You trade off strict OOP principles (enforcing privacy using private Symbol keys or closures) for simplicity of property inspection.

## Resources
- [YouTube Video Link](https://www.youtube.com/watch?v=p8-ile_nWnY)
- [Refactoring Guru - Memento Pattern](https://refactoring.guru/design-patterns/memento)

## My Notes
- Secure state encapsulation in JavaScript by utilizing Symbol keys or ES6 private fields (`#data`) inside `DatabaseMemento`. Pass a module-private Symbol authentication key from the `Database` to the memento to prevent caretakers or external clients from inspecting or restoring the state.
- Always run automated tests or test edge case functions (`remove()`, `update()`) instead of only validating happy-path insertion code.

## Examples Solved
- **Database Transaction Backup & Rollback:** Simulates beginning, committing, and rolling back database state updates.
