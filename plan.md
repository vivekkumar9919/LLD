# Low Level Design (LLD) Roadmap in Node.js / JavaScript

This document serves as the learning plan for mastering LLD from beginner to advanced. The curriculum is tailored for JavaScript and Node.js backend development, considering your e-commerce background.

## 0. The Fundamentals (SOLID Principles)
Before diving into patterns, you must internalize these:
- [ ] Single Responsibility Principle (SRP)
- [ ] Open/Closed Principle (OCP)
- [ ] Liskov Substitution Principle (LSP)
- [ ] Interface Segregation Principle (ISP)
- [ ] Dependency Inversion Principle (DIP)

## 1. Creational Design Patterns
*Focus: Object creation mechanisms.*
- [ ] **Singleton**: Global instances (e.g., Database Connection).
- [ ] **Factory Method**: Creating instances without specifying the exact class.
- [ ] **Abstract Factory**: Families of related objects.
- [ ] **Builder**: Step-by-step object construction (e.g., complex queries).
- [ ] **Prototype**: Object cloning.

## 2. Structural Design Patterns
*Focus: Assembling objects and classes into larger structures.*
- [ ] **Adapter**: Making incompatible interfaces collaborate.
- [ ] **Decorator**: Dynamically adding behaviors.
- [ ] **Facade**: Simplified interface to a complex system.
- [ ] **Proxy**: Controlling access to an object.
- [ ] **Composite**: Tree structures (e.g., file systems).
- [ ] **Bridge**: Separating abstraction from implementation.
- [ ] **Flyweight**: Efficiently sharing large numbers of objects.

## 3. Behavioral Design Patterns
*Focus: Algorithms and the assignment of responsibilities between objects.*
- [ ] **Observer**: Subscribing to events (Crucial in JS/Node).
- [ ] **Strategy**: Creating a family of interchangeable algorithms.
- [ ] **State**: Changing object behavior when internal state changes.
- [ ] **Command**: Encapsulating a request as an object.
- [ ] **Chain of Responsibility**: Passing requests along a chain of handlers.
- [ ] **Iterator**: Traversing elements of a collection.
- [ ] **Mediator**: Centralizing complex communications.
- [ ] **Memento**: Saving and restoring state.
- [ ] **Template Method**: Defining the skeleton of an algorithm.
- [ ] **Visitor**: Adding new operations without modifying existing classes.

## 4. Advanced Practice Problems
*Focus: Real-world interview scenarios.*
- [ ] Design a Rate Limiter
- [ ] Design a Vending Machine
- [ ] Design a Parking Lot
- [ ] Design an E-commerce Cart Checkout System
- [ ] Design a Notification System
- [ ] Design a Snake and Ladder Game

---

### Workflow instructions for Vivek:
1. Go to the `design_pattern` directory and write your code in the respective topic folder.
2. When you finish a pattern or system, notify me (your AI Reviewer).
3. I will review it strictly applying the `lld_reviewer` rubric and post feedback.
4. I will record the outcome in `PROGRESS.md`.
