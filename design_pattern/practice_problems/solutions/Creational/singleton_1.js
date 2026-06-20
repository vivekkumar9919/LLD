
/**
 * **singleton_1**: Implement a **Database Connection Pool** class 
 * asynchronously. Ensure the exact same pool instance is securely 
 * returned to 3 incoming API requests running concurrently. 
 */



class DbConnectionPool {
    static instance = null;
    static initialization = false;

    static async createDbConnection() {
        return { url: "Db_url_is", key: "DB" };
    }

    static async getDbInstance() {
        if (DbConnectionPool.instance) {
            console.log("Returning database connections from pool...");
            return DbConnectionPool.instance;
        }
        if (!DbConnectionPool.initialization) {
            DbConnectionPool.instance = (async () => {
                console.log("Creating a Database connections...");
                DbConnectionPool.instance = await this.createDbConnection();
                // console.log("creating db connections completed", DbConnectionPool.instance);
                DbConnectionPool.initialization = true;
                return DbConnectionPool.instance;
            })();

        }
        return DbConnectionPool.instance;
    }
}


const [request1, request2, request3] = await Promise.all([
    DbConnectionPool.getDbInstance(),
    DbConnectionPool.getDbInstance(),
    DbConnectionPool.getDbInstance(),
]);

console.log(request1);
console.log(request2);
console.log(request3);

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================

### 🚨 Code Issues & Execution Flow
There are a couple of fatal bugs in your async logic that will prevent this from working:
1. Trace `request1`. When the first call happens, `instance` is null and `initialization` is null. It enters the `if` block, sets 
`DbConnectionPool.instance` to a Promise, but then at the end, it returns `DbConnectionPool.initialization` (which is still `null`). So `request1` gets `null`!
2. `request2` and `request3` will hit `if(DbConnectionPool.instance)` and return the pending Promise. But because `request1` got 
`null`, the pool is completely broken for the first caller.
3. You never actually assign anything to `DbConnectionPool.initialization`.

**How to fix:** You need to assign the Promise to `initialization`, and then ALL callers (including the first one) should `await` and return that `initialization` Promise until `instance` is fully ready.

### 🧠 Deep Dive Questions
1. **Concurrency Check:** If you fix the logic to return `DbConnectionPool.initialization`, and `request1`, `request2`, and `
request3` are fired concurrently, how many times will "Creating a Database connections..." be printed to the console? 
2. **Cross-Pattern Context (SOLID & Proxy):** Right now, `DbConnectionPool` has two responsibilities: managing database 
connections, AND managing its own complex async singleton lifecycle (violating SRP). If you had 10 different service 
classes that all needed to be async singletons, how could you use the **Proxy Pattern** or a **Factory Pattern** to abstract 
this async singleton logic away so you don't repeat it in every class?

**Next Steps:** Fix the async logic so `request1` doesn't get `null`, add your answers below, and ping me for a re-review!
================================================================================
### 🧠 Deep Dive Questions
1. Creating a Database connections... printed only ones so database is created only once and 
further calls get connectios from existing poll 

--------------------------------------------------------------------------------
🏆 FINAL EVALUATION
--------------------------------------------------------------------------------
**Code Review:** Your fix works! By assigning `DbConnectionPool.instance` to the Promise 
immediately, the concurrent requests hit the first `if` statement and wait for that 
exact same Promise to resolve. Once it resolves, the Promise overwrites itself with 
the actual DB object. This is a clever JavaScript trick! (Though in enterprise code, 
keeping `instance` and `initializationPromise` as two separate variables is slightly 
safer for type-checking).

**Q1 (Concurrency):** Correct! It will print exactly once.

**Q2 (Cross-Pattern):** You missed this one! Here is the answer:
If you have 10 classes, writing this async lock logic in every single class 
violates the **Single Responsibility Principle**. Instead, you can use the
 **Proxy Pattern**! You can write a generic `makeAsyncSingleton(ClassRef)` 
 function that returns a Proxy. The Proxy intercepts the `new` or `getInstance` 
 calls, manages the Promise lock internally, and instantiates the underlying class 
 only once. This keeps the DB class purely focused on DB stuff!

================================================================================
*/
