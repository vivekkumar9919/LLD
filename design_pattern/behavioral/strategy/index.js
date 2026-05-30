

class Walkable {
    walk() {
        throw new Error("Methods should be implemented");
    }
}

class NormalWalk extends Walkable {
    walk() {
        console.log("Normal walk")
    }
}

class NoWalk extends Walkable {
    walk() {
        console.log("No walk");
    }
}

class Flyable {
    fly() {
        throw new Error("Methods should be implemented");
    }
}

class NormalFly extends Flyable {
    fly() {
        console.log("Fly");
    }
}

class NoFly extends Flyable {
    fly() {
        console.log("No fly");
    }
}

class Robot {
    constructor(walkable, flyable) {
        this.walkable = walkable;
        this.flyable = flyable;
    }

    setWalkStrategy(walkable) {
        this.walkable = walkable;
    }

    setFlyStrategy(flyable) {
        this.flyable = flyable;
    }

    walk() {
        this.walkable.walk();
    }
    fly() {
        this.flyable.fly();
    }
}

const walkWithFly = new Robot(new NormalWalk(), new NormalFly());
walkWithFly.walk();
walkWithFly.fly();

const walkWithNoFly = new Robot(new NormalWalk(), new NoFly());
walkWithNoFly.walk();
walkWithNoFly.fly();

console.log("--- Dynamic Swapping Demo ---");
const dynamicRobot = new Robot(new NormalWalk(), new NormalFly());
dynamicRobot.walk(); // Normal walk
dynamicRobot.fly();  // Fly

// Swap strategies at runtime
dynamicRobot.setWalkStrategy(new NoWalk());
dynamicRobot.setFlyStrategy(new NoFly());
dynamicRobot.walk(); // No walk
dynamicRobot.fly();  // No fly

/*
=========================================
INTERROGATION QUESTIONS (Strategy LLD)
=========================================
1. The "Middle Man" Critique:
   Currently, your `Robot` class defines `walk()` and `fly()` methods that do 
   nothing except delegate directly to `this.walkable.walk()` and `this.flyable.fly()`. 
   This direct delegation is often critiqued as a "Middle Man" code smell.
   - Why not eliminate the `Robot` class entirely and have the client orchestrate the 
     strategies directly (e.g., calling `walkStrategy.walk()`)?
   - What is the architectural defense for keeping the `Robot` class as a Context?

2. Runtime Swapping & Syntax Clean-up:
   One of the primary benefits of the Strategy Pattern is the ability to change 
   behaviors at runtime dynamically.
   - Currently, your `Robot` class only allows setting strategies during instantiation. 
     How would you refactor `Robot` to support swapping strategies dynamically at 
     runtime?
   - Look at the `Robot` constructor body:
     ```javascript
     this.walkable = walkable,
     this.flyable = flyable
     ```
     Why is there a comma separating those assignments instead of a semicolon, and what 
     are its syntax implications in JavaScript?

---Vivek Answer---
1. It is important to keep a robot class becuase clients should not be 
   aware of the underlying strategies. and internal implemtation details should be 
   hidden. it can voiltes dependecy inversion principle
2. Do not know how to implement this. 

--- AI EVALUATION ---
1. The "Middle Man" Critique:
   - What is Right: Your defense is correct. The `Robot` class (Context) decouples the client from knowing or orchestrating internal algorithms directly, keeping the codebase aligned with DIP (Dependency Inversion Principle) and encapsulating detail changes.
   - What is Wrong: Nothing.
   - What is Missing: You could also note that the Context class holds entity state (like name, position, battery) that strategies need to access or modify, making the Context a necessary state coordinator.

2. Runtime Swapping & Syntax Clean-up:
   - What is Right: You updated the constructor code from a comma `,` to a proper semicolon `;` separation, resolving the syntax smell.
   - What is Wrong: You didn't answer how to support dynamic swapping or why the comma was valid.
   - What is Missing: 
     * *Dynamic Swapping:* To implement this, simply add setter methods to the `Robot` class:
       ```javascript
       setWalkStrategy(walkable) {
           this.walkable = walkable;
       }
       setFlyStrategy(flyable) {
           this.flyable = flyable;
       }
       ```
     * *Comma Operator:* In JS, the comma `,` is the comma operator. It evaluates both expressions and returns the result of the last one. Using it to separate statements inside a block is syntactically valid but is a code style smell that can cause Auto-Semicolon Insertion (ASI) issues.
*/