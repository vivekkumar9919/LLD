# Summary

## About
- **Iterator Pattern (Behavioral)**: Lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).
- It extracts the traversal behavior of a collection into a separate object called an iterator.

## Resources
- [Refactoring Guru - Iterator](https://refactoring.guru/design-patterns/iterator)
- [MDN - Iteration Protocols in JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

## My Notes
- **Multiple Iterators**: One of the biggest advantages is that you can have multiple active iterators traversing the same collection at the same time, each maintaining its own independent state (`current index`, `stack`, etc.).
- **Traversal Strategies**: If a collection (like a Tree) supports multiple ways of traversal (e.g., Depth-First vs Breadth-First), you don't leak this to the client. Instead, you provide multiple factory methods on the collection like `createInOrderIterator()` and `createLevelOrderIterator()`.
- **Native JS Protocol**: Instead of creating custom `hasNext()` and `next()` methods, modern JavaScript provides the `[Symbol.iterator]()` protocol. Implementing this allows your custom classes to be used in standard `for...of` loops natively!
- **Concurrent Modification**: Modifying a collection while an iterator is actively traversing it can cause fatal bugs or infinite loops.
  - **Fail-Safe**: The iterator clones the collection upon creation. Safe, but uses $O(N)$ extra memory.
  - **Fail-Fast**: The collection tracks modifications (`modCount`). The iterator compares the current `modCount` with the expected `modCount` on every `next()` call and throws an Exception if they mismatch.

### Tradeoffs / Pros & Cons
**Pros**:
1. **Single Responsibility Principle**: You can clean up the client code and the collections by extracting bulky traversal algorithms into separate classes.
2. **Open/Closed Principle**: You can implement new types of collections and iterators and pass them to existing code without breaking anything.
3. **Uniform Interface**: You can iterate over different data structures using the exact same interface, making the client code highly polymorphic.

**Cons**:
1. **Overkill**: Applying the pattern can be an overkill if your app only works with simple arrays or lists.

## Examples Solved
- **Polymorphic Collections**: Created `ArrayCollection`, `LinkedList`, and `BinaryTree` classes that all implement a `createIterator()` method. Built a `printCollection(collection)` function that works flawlessly across all three completely different data structures by utilizing the `hasNext()` and `next()` interface. Particularly impressive was the use of a Stack to iteratively traverse the Binary Tree in-order.
