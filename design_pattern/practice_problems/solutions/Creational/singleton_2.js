
/**
 * **singleton_2**: Implement a **Logger** class eagerly. Ensure all components 
 * in the app write to the exact same log buffer array without race conditions.
 */

class Logger {
    #logBuffer = [];
    constructor() {
        console.log("Instance created");
    }
    log(message) {
        const timeStamp = new Date().toISOString();
        this.#logBuffer.push(`[${timeStamp}, ${message}]`);
    }
    viewLogs() {
        return [...this.#logBuffer];
    }

}

const instance = new Logger()

export default instance;


/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================

### 🚨 Code Issues & Requirements Check
You implemented a **Lazy Singleton** instead of an **Eager Singleton**! 
1. The problem explicitly asked to implement it **eagerly**. Eager initialization means 
the instance is created immediately when the module/script is loaded, *before* any 
client ever calls `getLogger()`. Right now, your code waits until line 17 
(`if(!Logger.instance) Logger.instance = new Logger;`) to create it.
2. Inside your `log` and `viewLogs` methods, you are doing 
`Logger.instance.#logBuffer.push(...)`. Since these are instance methods, 
you should just use `this.#logBuffer`.

**How to fix:** Change your static property to initialize immediately (e.g., `static instance = new Logger();`) and remove the instantiation logic from `getLogger()`.

### 🧠 Deep Dive Questions
1. **Why Eager?** What is the main advantage of using an Eager Singleton over a Lazy Singleton, 
especially in multi-threaded languages (even though JS is single-threaded)?
2. **Cross-Pattern Context (Observer):** Imagine you have a `DebugUI` class that 
needs to render logs on the screen the exact moment they happen. Instead of the `DebugUI` 
constantly polling `viewLogs()`, how could you integrate the **Observer Pattern** into 
this Logger so the UI updates automatically when `log()` is called?

**Next Steps:** Refactor the code to be a true Eager Singleton, use `this` inside your instance methods, drop your answers below, and let me know when you're ready for a re-review! 
================================================================================
### 🧠 Deep Dive Questions
1. Eager is important when class initializations take time and heavy operation in that case eager is more usefull
   so on every object creation or process we do not need to wait for long time and its also have pros that it can make the 
   startup of code slow 
2. we can render on logs without polling using the observer design pattern where we can subscribe the events so when any logs get
   pushed then it send update to all subscriber and UI get render in realtime 

--------------------------------------------------------------------------------
🏆 FINAL EVALUATION
--------------------------------------------------------------------------------
**Code Review:** Perfect refactor! Using ES6 Module caching (`export default new Logger()`) is the absolute best 
way to implement an Eager Singleton in JavaScript/Node.js. It guarantees that the instance is created exactly 
once when the file is first imported, and any subsequent imports just get the cached instance. 
You also correctly fixed the context to use `this.#logBuffer`.

**Q1 (Why Eager):** Spot on. The tradeoff is indeed a slower startup time versus faster runtime access. 
Additionally, in multi-threaded languages (like Java), Eager initialization completely eliminates race 
conditions because the instance is created when the class is loaded by the JVM, long before multiple 
threads try to access it simultaneously.

**Q2 (Observer Pattern):** Excellent! By making the `Logger` a Subject, it can notify the `DebugUI` (the Observer) 
the exact millisecond a new log is pushed, eliminating the need for expensive polling loops. 
================================================================================
*/


/**
--------------------------------------------------------------------------------
My Note
-------------------------------------------------------------------------------- 
Complete implementation of the Observer pattern (Question 2) will be done in the future.
 */