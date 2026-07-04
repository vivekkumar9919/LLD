/**
 **composite_1** (UI Components): The Composite Pattern
 
 ### The Scenario (Interview Style)
 You are building a custom Frontend UI library (similar to React). 
 In your framework, developers can create standalone elements (like a `Button` or an 
 `Input` field). They can also create "Container" elements (like a `Panel` or a 
 `Window`) that hold multiple other elements inside them.
 
 When the page loads, the framework engine needs to traverse the entire UI Tree 
 and call `.render()` on everything so it draws to the screen. However, the engine 
 shouldn't have to write if/else statements checking whether an element is a 
 single Button or a giant Window container before rendering it. It just wants to 
 call `.render()` and have it magically work!
 
 ### Your Task
 Implement the **Composite Pattern** so that single elements (Leafs) and complex 
 containers (Composites) are treated exactly the same way by the client.
 
 1. Create a `Button` class and an `Input` class (Your Leafs).
    - Their constructor takes a `name` (e.g. "Submit Button").
    - Their `.render()` method simply logs: `"Rendering [name]"`
    
 2. Create a `Panel` class and a `Window` class (Your Composites).
    - Their constructor takes a `name`.
    - They must have an `add(component)` method that stores elements in an array.
    - Their `.render()` method must log `"Rendering [name]"` AND then loop through 
      all their children and call `.render()` on them too!
 
 Prove it works by building this UI Tree:
 - Create a `Window` named "Login Window".
 - Add a `Panel` named "Form Panel" to the Window.
 - Add an `Input` ("Username") and an `Input` ("Password") into the Form Panel.
 - Add a `Button` ("Login") directly to the Window (outside the panel).
 
 Finally, call `.render()` ONCE on the Window. It should recursively print out the 
 rendering logs for all 5 components!
 */