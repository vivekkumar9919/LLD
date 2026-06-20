
/**
 **singleton_3**: Implement a Singleton `FeatureToggleService` that fetches a 
 massive remote JSON config (delay mock with setTimeout). Test what happens 
 if multiple modules request the toggle status while the network request is still pending.
 */

/**
 here i have taken this approcah , i can also take other approach of singleton pattern 
 like eager intailize because FeatureToggleService is heavy operations 
 */

class FeatureToggleService {
    static instance = null;

    static async getConfig() {
        await new Promise(async (resolve, rejected) => {
            console.log("fetching Data ....")
            setTimeout(resolve, 2000)
        })

        return {
            feature_name: "abc",
            tickets: "1233",
            created_By: "vivek",
            toggle: true
        }
    }
    static async getToggleInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = (async () => {
            this.instance = await this.getConfig();
            return this.instance;
        })();

        return this.instance;
    }
}

// here request1 take 2000ms time and request2 do not take that much time because instance is created and return 
const [request1, request2] = await Promise.all([FeatureToggleService.getToggleInstance(), FeatureToggleService.getToggleInstance()]);

console.log("request1", request1);
console.log("request2", request2);

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================

### 🚨 Code Issues & Execution Flow
Take a close look at your comment on line 38: *"request2 do not take that much time because instance is created and return"*. **This is actually incorrect!**
If you run this code, you will see `fetching Data ....` printed TWICE.

Why? Because you forgot the "Promise Lock" trick you learned in `singleton_1`!
1. Request 1 checks `instance` (it's null), and calls `await this.getConfig()`. While it is waiting for the 2000ms delay...
2. Request 2 checks `instance`. Since Request 1 is still waiting and hasn't assigned the final object to `instance` yet, it is *still* null! So Request 2 also calls `getConfig()` and triggers a second network request.

**How to fix:** You need to assign the pending Promise to `instance` immediately, BEFORE you `await` it, just like you did in `singleton_1`! (`FeatureToggleService.instance = this.getConfig(); return await FeatureToggleService.instance;`)

### 🧠 Deep Dive Questions
1. **Cross-Pattern Context (Eager Initialization):** In your comments, you mentioned that you could use 
"eager initialize because FeatureToggleService is heavy operations". Actually, using an Eager Singleton to 
fetch massive data over the network during application startup is usually considered an **anti-pattern**. 
Why is it dangerous to make blocking network calls (like fetching a huge JSON) during the eager initialization 
phase of an app? (Think about startup times and error handling).

**Next Steps:** Fix the race condition so `fetching Data ....` only prints exactly once, drop your answer to the question below, and let me know when you're ready for a re-review!
================================================================================
1. yes we should avoid the Eager Initialization on startup we can use lazy singleton here so once one request come we fetch 
the data and use same instance for further call .

--------------------------------------------------------------------------------
🏆 FINAL EVALUATION
--------------------------------------------------------------------------------
**Code Review:** Excellent! You correctly reapplied the Promise Lock trick. By instantly 
assigning the pending Promise to `instance`, the second concurrent request hits the 
`if (FeatureToggleService.instance)` block and safely waits for the *exact same* 
Promise to resolve. You successfully avoided the double network request race condition.

**Q1 (Eager vs Lazy for Network calls):** Spot on. If you eagerly load a 10MB JSON file 
over the network, your entire server/application is blocked from fully starting up 
for multiple seconds. Furthermore, if the network request fails, your entire app 
crashes on boot. By using a Lazy Singleton, your app boots instantly, and you can 
gracefully handle the delay or failure on the first actual user request.

**Status:** ✅ Completed! 
================================================================================
*/