/**
 * ==========================================
 * Problem 3: The Global App Configuration
 * ==========================================
 * 
 * ### The Scenario
 * Your backend Node.js application has a `ConfigManager` that reads settings from a 
 * `.env` file (like Database URLs, API keys). 
 * 
 * Currently, your code looks like this:
 * 
 * class ConfigManager {
 *     constructor() {
 *         console.log("Reading 10MB config file from hard drive...");
 *         // Pretend we are doing heavy I/O parsing here
 *         this.settings = { db: "postgres://...", apiKey: "12345" };
 *     }
 *     get(key) {
 *         return this.settings[key];
 *     }
 * }
 * 
 * Right now, every single service in your app (AuthService, ProductService, 
 * BillingService) uses `new ConfigManager()` whenever it needs a setting. 
 * This means your server is reading the same heavy file from the hard drive 
 * dozens of times per API request, causing massive lag!
 * 
 * ### Your Task
 * Refactor this setup using a Design Pattern so that the `ConfigManager` is 
 * only ever created EXACTLY ONCE, and the hard drive is only read ONE time.
 * 
 * 1. Prevent developers from accidentally instantiating a new instance of 
 *    `ConfigManager` in the future. (Note: In JavaScript, we can't make constructors strictly 
 *    private like in Java, but you can throw an error or use statics to enforce it).
 * 2. Provide a global point of access to fetch the single shared instance.
 * 3. Prove your architecture works by writing client code that requests the 
 *    ConfigManager in an "AuthService" and requests it again in a "BillingService", 
 *    and prove they are pointing to the exact same object in memory!
 */


class ConfigManager {
    static instance = null;
    static async #getConfig() {
        console.log("Creating instance ...")
        return {
            db: { url: "db", name: "connect" },
            featureFlag: { feature: true, ticket: "1234" },
        }
    }
    static getInstance() {
        if (this.instance) {
            console.log("returning instance object is already created")
            return this.instance;
        }
        this.instance = (async () => {
            this.instance = await this.#getConfig();
            return this.instance;
        })();
        return this.instance;
    }
}

const ProductService = ConfigManager.getInstance();
const AuthService = ConfigManager.getInstance();
const BillingService = ConfigManager.getInstance();
