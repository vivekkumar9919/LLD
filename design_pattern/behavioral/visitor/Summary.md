# Visitor Pattern Summary

## About
The **Visitor Design Pattern** is a behavioral design pattern that lets you separate algorithms from the objects on which they operate. It relies heavily on a mechanism called **Double Dispatch** to execute the correct method based on both the runtime type of the visitor and the runtime type of the element.

## Resources
- [YouTube Video Link](https://www.youtube.com/watch?v=DnmsxnlCyl0)
- [Doc Link]()

## My Notes
- **Elements vs Visitors:** Elements must implement an `accept(visitor)` method. Visitors must implement a `visit(element)` method for *each* specific element type.
- **Double Dispatch:** In Javascript, because we lack static parameter-type overloading, double dispatch is explicitly simulated. `element.accept(visitor)` dynamically binds to the correct element instance, and inside `accept`, `visitor.visitSpecificElement(this)` dynamically binds to the specific visitor, routing execution correctly without messy `if (element instanceof Type)` checks.
- **State Accumulation:** A major benefit of Visitors is that they can contain internal state (e.g. `this.totalSize = 0`). As the visitor gets passed sequentially to different elements (like iterating over an array of elements), it can accumulate results or state without polluting the elements themselves.

### Pros
- **Open-Closed Principle (for Operations):** You can easily introduce a new operation over an entire object structure (like adding `EncryptionVisitor`) without modifying the element classes at all.
- **Separation of Concerns:** Business logic (size calculation, exporting, formatting) is cleanly extracted out of the data classes.
- **State Gathering:** A visitor can accumulate state as it traverses various objects, which is harder if the operations are scattered across the elements.

### Cons
- **Open-Closed Principle Violation (for Elements):** If you need to add a *new element class* to the hierarchy (like `AudioFile`), you must update *every single existing Visitor* to support `visitAudioFile()`.
- **Encapsulation Risk:** Visitors often require elements to expose internal state via getters, which can weaken encapsulation.

## Tradeoffs
- The Visitor Pattern is extremely beneficial when the **Element hierarchy is stable**, but you frequently need to add **new operations**. If the Element hierarchy is frequently changing, the Visitor pattern becomes an anti-pattern.

## Examples Solved
- Implemented a `FileSystemVisitor` to perform `SizeCalculation`, `Compression`, and `VirusScanning` over different types of `FileSystemItem` (`TextFile`, `ImgFile`, `VideoFile`).
