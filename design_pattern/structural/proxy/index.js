
// Virtual Proxy

/** 

// Problem Without Proxy
// Suppose image loading is heavy.

class HighResolutionImage {
    constructor(filename) {
        this.filename = filename;

        // Heavy processing
        console.log("Loading image from disk...");
        for (let i = 0; i < 1e9; i++) {}
        
        
    }

    display() {
        console.log(`Displaying ${this.filename}`);
    }
}

const image = new HighResolutionImage("photo.jpg");

console.log("App Started");

image.display();


// Problem
// Even if:
// user never calls display()
// object still loads heavy data
// Startup becomes slow.

*/

class HighResolutionImage {
    constructor(filename) {
        this.filename = filename;

        console.log("Loading image from disk...");

        // Simulate heavy processing
        for (let i = 0; i < 1e9; i++) { }
    }

    display() {
        console.log(`Displaying ${this.filename}`);
    }
}

class ImageProxy {
    constructor(filename) {
        this.filename = filename;
        this.realImage = null;
    }

    display() {

        // Lazy Initialization
        if (!this.realImage) {
            this.realImage = new HighResolutionImage(this.filename);
        }

        this.realImage.display();
    }
}

console.log("Application Started");

const image = new ImageProxy("photo.jpg");

console.log("Proxy Created");

// Heavy loading NOT happened yet

image.display();

/**
 * 🎙️ INTERROGATION - LLD REVIEWER
 * 
 * 1. Proxy vs. Decorator: Structurally, a Proxy and a Decorator look almost identical. 
 *    They both wrap an object and implement the same interface. What is the fundamental 
 *    architectural difference in INTENT between the two?
 * 
 * 2. The Cache Proxy Trap: Let's say we want to cache the image processing so it 
 *    only loads once, even if `new ImageProxy("photo.jpg")` is called 100 times 
 *    in different parts of the app. How would you modify your current Proxy to 
 *    support application-wide caching?
 * 
 * 3. The Protection Proxy (Security): How could you use this exact same pattern 
 *    to implement a "Protection Proxy" that ensures only an Admin user can 
 *    display the high-resolution image? Where would the auth check go?
 * 
 * --- VIVEK'S ANSWERS ---
 * 1. The Decorator Pattern: Adding Responsibilities
      The intent of a Decorator is augmentation. It is used to dynamically add new behaviors or 
      responsibilities to an object without changing its core logic.
      The Proxy Pattern: Controlling Access
      The intent of a Proxy is control. It acts as a gatekeeper, manager, or stand-in for an object. 
      It decides if, when, and how a client can access the real subject.
 * 2. System design is not about what is right or wrong its always a trade off , caching is also a 
 *    good practice but what if we are not implementing a any cache layer 
 * 3. Implemented in protection.js file 
 * 
 * --- AI EVALUATION ---
 * 1. PERFECT answer. Decorator = Augmentation. Proxy = Control. You nailed the conceptual difference.
 * 2. You dodged the question! I didn't ask *if* we should cache, I asked *how*. To implement an 
 *    application-wide Cache Proxy, you would use a static property on the Proxy class:
 *    ```javascript
 *    class ImageProxy {
 *        static cache = {}; // Shared across all instances
 *        // ...
 *        display() {
 *            if (!ImageProxy.cache[this.filename]) {
 *                ImageProxy.cache[this.filename] = new HighResolutionImage(this.filename);
 *            }
 *            ImageProxy.cache[this.filename].display();
 *        }
 *    }
 *    ```
 * 3. `protection.js` is flawless. You correctly intercepted the call, verified the role, and conditionally delegated. Excellent.
 *    
 */