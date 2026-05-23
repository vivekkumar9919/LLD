# Summary

## About
- **Composite Pattern (Structural)**: Lets you compose objects into tree structures to represent part-whole hierarchies. It allows clients to treat individual objects and compositions of objects uniformly.
- It relies on a common interface (Component) shared by both the simple elements (Leaves) and the complex elements (Composites/Containers).

## Resources
- [YouTube Video Link](https://www.youtube.com/watch?v=xaaiMGmyDJk)
- [Refactoring Guru - Composite](https://refactoring.guru/design-patterns/composite)

## My Notes
- **Transparency vs Safety**: 
  - *Transparency*: Placing `add()`/`remove()` in the base Component interface. Gives perfect Liskov Substitution Principle (LSP) because clients treat all nodes identically, but violates the Interface Segregation Principle (ISP) because Leaf nodes are forced to implement useless methods.
  - *Safety*: Placing `add()`/`remove()` only in the Composite class. Respects ISP but slightly weakens LSP because clients must check `isFolder()` before adding children.
- **Performance**: Deeply nested composite trees can cause main-thread blocking when computing aggregate data (like `getSize()`). Use caching at the Composite level to achieve $O(1)$ lookups.
- **Infinite Loops**: Trees must remain Directed Acyclic Graphs (DAGs). Always implement checks to prevent adding a node to itself or creating circular dependencies (`item.contains(this)`).

### Tradeoffs / Pros & Cons
**Pros**:
1. **Uniformity**: Clients can treat complex trees and simple leaves identically, drastically simplifying client code.
2. **Open/Closed Principle**: You can introduce new element types into the app without breaking existing code, which now works with the object tree.

**Cons**:
1. **Over-generalization**: Providing a common interface for classes whose functionality differs drastically can make the component interface bloated and hard to comprehend.
2. **Performance Constraints**: Recursive tree traversal can be extremely expensive computationally. 

## Examples Solved
- **File System**: Implemented a `FileSystem` hierarchy with `File` (Leaf) and `Folder` (Composite). The `Folder` delegates operations like `ls()`, `openAll()`, and `getSize()` recursively to its children, allowing the client to call `root.getSize()` without knowing how deeply nested the files are.
