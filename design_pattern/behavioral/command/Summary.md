# Summary

## About
- **Command Pattern (Behavioral)**: Turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as a method arguments, delay or queue a request's execution, and support undoable operations.
- It decouples the **Invoker** (the thing triggering the request, e.g., a GUI Button) from the **Receiver** (the thing performing the actual work, e.g., a Database or a Light Bulb).

## Resources
- [Refactoring Guru - Command](https://refactoring.guru/design-patterns/command)

## My Notes
- **Command vs Callback**: In JavaScript, passing a function callback `() => light.on()` accomplishes the basic decoupling of a Command. However, the true Object-Oriented Command Pattern is necessary when you need:
  1. **State**: The command needs to remember things (e.g., the previous state before execution).
  2. **Undo/Redo**: A callback cannot have an `undo()` method attached to it cleanly.
- **The Undo Stack**: To implement a robust "Global Undo", the Invoker must maintain a Stack (Array) of executed Commands. When `undo` is requested, it pops the most recent command and calls its `undo()` method.
- **Macro Commands**: You can combine multiple commands into one by creating a `MacroCommand` class that implements the `Command` interface. It holds an array of sub-commands. On `execute()`, it loops through them forward. On `undo()`, it loops through them *backward*.

### Tradeoffs / Pros & Cons
**Pros**:
1. **Single Responsibility Principle**: You can decouple classes that invoke operations from classes that perform these operations.
2. **Open/Closed Principle**: You can introduce new commands into the app without breaking existing client code.
3. **Undo/Redo & Queuing**: You can implement undo/redo, delayed execution, and network request queuing.
4. **Macro Commands**: You can assemble simple commands into a complex one.

**Cons**:
1. **Complexity**: The code may become more complicated since you're introducing a whole new layer between senders and receivers.

## Examples Solved
- **Smart Home Remote**: Created `Light` and `Fan` receivers, wrapped them in `LightCommand` and `FanCommand`, and triggered them via a `RemoteController` (Invoker). Implemented a `this.history` Stack inside the Remote to support Global Undo, and created a `MacroCommand` to trigger a "Party Mode" without modifying the remote's logic.
