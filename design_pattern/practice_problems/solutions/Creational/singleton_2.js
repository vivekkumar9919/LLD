
/**
 * **singleton_2**: Implement a **Logger** class eagerly. Ensure all components 
 * in the app write to the exact same log buffer array without race conditions.
 */

class Logger {
    static instance = null;
    #logBuffer = [];
    constructor() {
        if (Logger.instance) {
            throw new Error("We can not create multiples instance");
        }
        Logger.instance = this;
    }
    static getLogger() {
        if (!Logger.instance) {
            Logger.instance = new Logger;
        }
        return Logger.instance;
    }
    log(message) {
        const timeStamp = new Date().toISOString();
        Logger.instance.#logBuffer.push(`[${timeStamp}, ${message}]`);
    }
    viewLogs() {
        return [...Logger.instance.#logBuffer];
    }

}

const logger1 = Logger.getLogger();
logger1.log("message1");
logger1.log("message2");
console.log(logger1.viewLogs())

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
1. **Why Eager?** What is the main advantage of using an Eager Singleton over a Lazy Singleton, especially in multi-threaded languages (even though JS is single-threaded)?
2. **Cross-Pattern Context (Observer):** Imagine you have a `DebugUI` class that needs to render logs on the screen the exact moment they happen. Instead of the `DebugUI` constantly polling `viewLogs()`, how could you integrate the **Observer Pattern** into this Logger so the UI updates automatically when `log()` is called?

**Next Steps:** Refactor the code to be a true Eager Singleton, use `this` inside your instance methods, drop your answers below, and let me know when you're ready for a re-review! 
================================================================================
*/
