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

class UILibrary {
   constructor(name) {
      this.name = name;
   }
   render() {
      throw new Error("Methods should be implemented");
   }
}
class UILibrarySimple extends UILibrary {
   constructor(name) {
      super();
      this.name = name;
   }
   render() {
      console.log("Rendering Simple UI ...", this.name);
   }
}
class UILibraryComplex extends UILibrary {
   constructor(name) {
      super();
      this.name = name;
      this.children = [];
   }
   add(childClass) {
      this.children.push(childClass);
   }
   render() {
      console.log("Rendering Complex UI for ...", this.name);
      for (const child of this.children) {
         child.render()
      }
   }
}

const login = new UILibrarySimple("login");
const username = new UILibrarySimple("username");
const password = new UILibrarySimple("password");

const window = new UILibraryComplex("Login Window");
const panels = new UILibraryComplex("Form Panel")

window.add(panels);
panels.add(login);
panels.add(username);
panels.add(password);

window.render();

/*
 [Review] ⭐⭐⭐⭐ 4/5
 
 **Reviewer Feedback:**
 - Excellent implementation of the core Composite Pattern! You correctly built a Component interface (`UILibrary`), a Leaf (`UILibrarySimple`), and a Composite (`UILibraryComplex`).
 - The execution works flawlessly. When `window.render()` is called, it correctly trickles down to all children.
 - *Minor note:* The prompt asked for specific class names (`Button`, `Input`, `Panel`, `Window`), but generalizing them into `Simple` and `Complex` is architecturally valid! Just be careful in real interviews to follow explicit naming requests.
 
 **Cross-Pattern Question:**
 If we wanted to add an `onClick()` method to a `Button` Leaf that executes a 
 completely different algorithm depending on the context (e.g., a `Login` 
 algorithm vs a `Signup` algorithm), which Behavioral Design Pattern would you 
 combine with this Composite to handle that click behavior dynamically without 
 hardcoding it?
 */

/**
 ---------------------My answer--------------------------
 Here wr can use a factory design pattern and name the class onlcick if clients 
 pass as login then invoke the login class else we can invoke the signup class 
 and both the class have common methods name , so infuture we requried a more 
 onclick event we need one more class and its factory upadate only which follow 
 the SOLID too 

 **Reviewer Response:**
 You are thinking in the right direction regarding decoupling! A Factory would 
 definitely be useful to *create* the correct object. 
 However, the Factory pattern is a *Creational* pattern. The question 
 specifically asked for a **Behavioral** pattern. 
 
 In UI libraries, this is canonically solved using the **Strategy Pattern** 
 (or the **Command Pattern**). 
 You would inject a `ClickStrategy` (or a `Command`) into the `Button` 
 constructor. When the button is clicked, it simply calls 
 `this.strategy.execute()`. This way, the Button never has to run a 
 Factory or know about strings like "login". It just blindly executes whatever 
 behavior was handed to it!
 */

