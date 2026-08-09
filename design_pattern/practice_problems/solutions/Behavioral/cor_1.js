/**
 * ==========================================
 * PRACTICE PROBLEM: Logger System (Chain of Responsibility)
 * ==========================================
 * 
 * ### The Scenario
 * You are building a centralized logging system for a large backend application.
 * The application generates logs at different severity levels:
 * 1. DEBUG (e.g., "Variable x is 5")
 * 2. INFO (e.g., "User logged in")
 * 3. ERROR (e.g., "Database connection failed")
 * 
 * Instead of writing a massive `switch` statement to handle formatting and 
 * routing (e.g., printing Debug to console, saving Info to a file, and sending 
 * Errors to an alerting service), you want to decouple the handlers.
 * 
 * ### Your Task
 * Build a system that can pass a log message through a sequence of independent 
 * handlers until one of them decides to process it. 
 * 
 * 1. Each handler should only care about its specific severity level.
 * 2. If a handler receives a log it isn't responsible for, it must seamlessly 
 *    pass it to the next handler in the pipeline.
 * 3. The handlers must NOT have hardcoded dependencies on each other (e.g., 
 *    a debug handler shouldn't explicitly instantiate an info handler inside 
 *    its own logic).
 * 
 * Write a client script that:
 * 1. Sets up the three levels of logging.
 * 2. Links them together into a pipeline.
 * 3. Sends an ERROR message to the start of the chain. 
 *    Verify that it bubbles past the lower levels and is successfully handled 
 *    by the correct one!
 */

const loggerObject = {
    debug: "DEBUG",
    info: "INFO",
    error: "ERROR",
}


class Logger {
    constructor() {
        this.nextLogger = null;
    }
    setNextLogger(logger) {
        this.nextLogger = logger;
    }
}

class DebugLog extends Logger {
    constructor() {
        super();
    }
    log(loggerType, message) {
        if (loggerType.toUpperCase() === loggerObject.debug) {
            console.log("This is Debug log", message);
            return;
        }
        if (this.nextLogger) {
            this.nextLogger.log(loggerType, message);
        } else {
            throw new Error("Next logger is undefined");
        }
    }
}
class InfoLog extends Logger {
    constructor() {
        super();
    }
    log(loggerType, message) {
        if (loggerType.toUpperCase() === loggerObject.info) {
            console.log("This is Info log", message);
            return
        }
        if (this.nextLogger) {
            this.nextLogger.log(loggerType, message);
        } else {
            throw new Error("Next logger is undefined");
        }
    }
}
class ErrorLog extends Logger {
    constructor() {
        super()
    }
    log(loggerType, message) {
        console.log(loggerType.toUpperCase(), loggerObject.error)
        if (loggerType.toUpperCase() === loggerObject.error) {
            console.log("This is Error log", message);
            return
        }
        if (this.nextLogger) {
            this.nextLogger.log(loggerType, message);
        } else {
            throw new Error("Next logger is undefined");
        }
    }
}


const debugLog = new DebugLog();
const infoLog = new InfoLog();
const errorLog = new ErrorLog();

debugLog.setNextLogger(infoLog);
infoLog.setNextLogger(errorLog);

debugLog.log("info", "this is info msg");

/*
================================================================================
📝 PRACTICE REVIEW: Chain of Responsibility (cor_1)
================================================================================

**Overall Rating: ⭐⭐⭐⭐⭐ (5/5)**

This is a fantastic implementation! You perfectly encapsulated the core of the Chain of Responsibility pattern. By defining `setNextLogger()` in the base `Logger` class, you successfully decoupled the handlers from one another. `DebugLog` has absolutely no idea that `InfoLog` exists; it just knows that if it can't handle the message, it should pass it to `this.nextLogger`.

I also love the edge-case handling you added: `if (this.nextLogger)` bubbles the log down, but `else { throw new Error(...) }` ensures that unhandled logs don't just silently disappear into the void. 

Excellent work decoupling your control flow!
*/