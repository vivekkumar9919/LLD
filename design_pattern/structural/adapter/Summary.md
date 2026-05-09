# Summary

## About
- The **Adapter Design Pattern** is a Structural pattern that allows objects with incompatible interfaces to collaborate. It acts as a wrapper between two objects: it catches calls for one object and transforms them to format and interface recognizable by the second object.

## Resources
- [YouTube Video Link](https://www.youtube.com/watch?v=FV3x69rpwm0)
- [Doc Link]()

## My Notes
- The Adapter pattern allows incompatible interfaces to work together.
- In JavaScript, **Object Adapter** (using composition) is heavily preferred over **Class Adapter** (which requires multiple inheritance, something JS doesn't support natively).
- Thanks to JS's "duck typing", a formal `extends` is not strictly necessary for an adapter to work, but it is highly recommended for clarity and documentation.

## Examples Solved
- Converting an `XMLDataProvider` into a `Report` interface that expects JSON data.

## Pros
- **Single Responsibility Principle**: You separate the interface or data conversion code from the primary business logic.
- **Open/Closed Principle**: You can introduce new types of adapters into the program without breaking the existing client code.

## Cons
- **Complexity**: The overall complexity of the code increases because you need to introduce a set of new interfaces and classes. Sometimes it's simpler to just change the service class so that it matches the rest of your code.

## Tradeoffs
- **Adapter vs Refactoring**: Writing an adapter is fast and safe for legacy or third-party code. However, if you own the source code of both the client and the service, it might be cleaner to just refactor them to match, rather than adding an adapter layer.
- **Object vs Class Adapter**: Object Adapter (composition) is more flexible and can wrap subclasses, whereas Class Adapter (inheritance) can only wrap a specific class.
