# Template Method Pattern Summary

## About
The **Template Method Design Pattern** is a behavioral design pattern that defines the skeleton of an algorithm in a base class, letting subclasses override specific steps of the algorithm without changing its overall structure. 
It operates on the "Hollywood Principle": "Don't call us, we'll call you."

## Resources
- [YouTube Video Link](https://www.youtube.com/watch?v=8-vE_bmEt18)
- [Doc Link]()

## My Notes
- The base class contains the `template method` which orchestrates the flow of operations. This method is usually set up so it cannot or should not be overridden by subclasses.
- Subclasses implement or override the individual "step" methods.
- **Hooks**: Hooks are methods in the base class with empty or default implementations. Subclasses *can* override hooks to tap into the algorithm at specific points or to skip optional steps entirely.
- By utilizing this pattern, you enforce an algorithm's overall sequence and logic in one place, minimizing code duplication and enforcing structure.

### Pros
- **Deduplication:** Pulls common boilerplate out of subclasses and into a single base class.
- **Control:** The base class has strict control over the execution order, which is essential for workflows like authentication flows or data pipelines.
- **Extensibility:** Subclasses can easily plug into the defined slots.

### Cons
- **Rigidity:** The skeleton can become too rigid. If you suddenly need an entirely different execution order for a subclass, the pattern breaks down.
- **LSP Violations:** If a subclass implements a step in a way that violates the expectations of the base class pipeline, it can cause hard-to-trace bugs.
- **Complexity:** Adding many steps and hooks can make the base class very bloated.

## Tradeoffs
- You trade **flexibility of sequence** for **safety and consistency of sequence**. 

## Examples Solved
- Implemented a `ModelTrainer` base class with a `trainPipeline` template method to train algorithms like Neural Networks and Decision Trees.
