/**
 **proxy_1** (Virtual Proxy - Heavy Document): Lazy Initialization
 
 ### The Scenario (Interview Style)
 You are building a web-based document viewer (like Google Docs). When a user 
 opens a folder, they see a list of 50 documents. Your UI needs to display the 
 titles of all 50 documents immediately.
 
 Currently, your backend developer built a `RealDocument` class. Whenever it is 
 instantiated, it immediately loads 100MB of data from the disk into memory, 
 which takes 2 seconds per file.
 
 If you instantiate 50 `RealDocument` objects just to read their titles for the 
 UI list, your app will freeze for 100 seconds!
 
 ### Your Task
 Implement the **Proxy Pattern** (specifically, a *Virtual Proxy*) to fix this 
 performance issue.
 
 Requirements:
 - The client code (UI list) must be able to iterate over 50 document objects and 
   call `.getTitle()` on all of them instantly without the app freezing.
 - The heavy 100MB loading process must ONLY be triggered if the user actually 
   decides to call `.render()` on a specific document.
 - The client code must not know or care if it is interacting with the real 
   document or the proxy. They must share the exact same interface!
 
 Prove it works by writing client code that creates your Proxy, calls 
 `.getTitle()` twice (which should NOT trigger any heavy loading logs), and then 
 calls `.render()` (which SHOULD finally trigger the heavy loading logs).
 */

class RealDocument {
    constructor(title) {
        this.title = title;
        const start = Date.now();
        while (Date.now() - start < 2000) {
            // The heavy 100MB loading process
        }

    }
    getTitle() {
        console.log("Title is ", this.title);
    }
    render() {
        console.log("rendering the title...");
    }
}

// const realDocument = new RealDocument();
// here below logs printed with wait 
// console.log("checking ...")
// here without proxy first it will wait for 2s to load 100mb data then its start other process
// realDocument.getTitle("abc");


class DocumentProxy {
    constructor(title) {
        this.realDocument = null;
        this.title = title;
    }
    getTitle() {
        // if (!this.realDocument) {
        //     this.realDocument = new RealDocument(this.title);
        // }
        // this.realDocument.getTitle();
        console.log("Title is ", this.title);
    }
    render() {
        if (!this.realDocument) {
            this.realDocument = new RealDocument(this.title);
        }
        this.realDocument.render();
    }
}

const documentProxy = new DocumentProxy("vivekkumar");
// here below logs printed without any wait because object are not created for RealDocument it will created when methods are called 
console.log("Checking proxy...");
documentProxy.getTitle();
documentProxy.getTitle();
console.log("Checking proxy after getTitle...");
documentProxy.render();
// new heavy object creations is so it take time here 
console.log("Checking proxy after render...");

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================
**Rating:** ⭐⭐⭐⭐ (4/5)

### 🚨 Code Issues & Concept Check
You completely nailed the core concept! Your Lazy Initialization (`if (!this.realDocument)`) inside `render()` is perfect, and you correctly kept `getTitle()` fast and lightweight by NOT instantiating the real document!

However, there is one minor architectural flaw: **State Encapsulation.**

Right now, your `getTitle(title)` method takes the title as an argument. But what if the client doesn't know the title? What if the client only knows the filename?

In a true Proxy pattern, the Proxy acts as a stand-in for the real object. 
They should both be initialized with the same data!

```javascript
// The client should only pass the filename ONCE when creating the object
const proxy = new DocumentProxy("funny-cats.mp4");

// The client shouldn't have to pass it again!
proxy.getTitle(); // Should return "Title of funny-cats.mp4"
```

### 🧠 Next Steps
Update your code so that BOTH constructors (`RealDocument` and `DocumentProxy`) accept a `filename` parameter and save it to `this.filename`. 

Then, update your `getTitle()` methods so they don't take any arguments, but instead just use `this.filename`!

Ping me when you are ready for the 5/5!
================================================================================
*/

/*
--------------------------------------------------------------------------------
🏆 FINAL EVALUATION
--------------------------------------------------------------------------------
**Rating:** ⭐⭐⭐⭐⭐ (5/5)

**Code Review:** Absolute perfection! 

By initializing `this.title` in both constructors, you completely encapsulated the state. The client only has to provide the filename once (`new DocumentProxy("vivekkumar")`), and from then on, the Proxy acts exactly like the real object.

You successfully implemented a **Virtual Proxy** with Lazy Initialization!
If your client UI renders a list of 50 documents, it can loop through 50 proxies and call `.getTitle()` instantly, keeping your UI snappy and responsive. Only when a user specifically clicks on a document will `.render()` be called, finally triggering the heavy 2-second load of `RealDocument`.

This is exactly how ORMs (like Hibernate or Prisma) lazy-load relationships from the database, and how frontend frameworks lazy-load heavy images and components!

**Status:** ✅ Completed! 
================================================================================
*/

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK (Interview Discussion)
================================================================================

### 🧠 Deep Dive: Your Follow-Up Question
You asked an incredibly perceptive architectural question:
*"I think the proxy should not have its own implementation of getTitle()... in the real world it can be complex code and we cannot just maintain the same code in two places. Shouldn't the proxy just instantiate the real object and call its method, like in my commented code?"*

Your concern about **Code Duplication (DRY)** is 100% correct. 
If `getTitle()` was 50 lines of complex string parsing, 
we absolutely wouldn't want to copy-paste it into both classes!

**However, we cannot use your commented-out code!** 
Why? Because your commented code says 
`this.realDocument = new RealDocument(this.title);`. 
If we do that inside `getTitle()`, then the 2-second delay is triggered immediately! 
If the UI calls `getTitle()` on 50 documents, the app will freeze for 100 seconds 
again. We have entirely defeated the purpose of the Virtual Proxy.

**So how do real companies solve this dilemma?**
They solve it by separating the **Metadata** from the **Heavy Data**.

In a real enterprise system, you wouldn't duplicate the code. Instead, you would 
create a lightweight `DocumentMetadata` class that holds the complex `getTitle()` 
logic. Both the Proxy and the Real Object would just use that metadata object!

```javascript
// 1. The lightweight logic lives here (NO DUPLICATION!)
class DocumentMetadata {
    constructor(title) { this.title = title; }
    getComplexTitle() { return `Parsed: ${this.title}`; }
}

// 2. The Real Document takes the metadata, plus loads 
// the heavy 100MB data
class RealDocument {
    constructor(metadata) {
        this.metadata = metadata;
        // ... wait 2 seconds for heavy 100MB load
    }
    getTitle() { return this.metadata.getComplexTitle(); }
    render() { // render heavy data 
    }
}

// 3. The Proxy takes the metadata, but DOES NOT wait 2 seconds!
class DocumentProxy {
    constructor(metadata) {
        this.metadata = metadata;
        this.realDocument = null;
    }
    getTitle() {
        // We use the shared metadata object! Fast and DRY!
        return this.metadata.getComplexTitle();
    }
    render() {
        if (!this.realDocument) {
            // Trigger 2s delay only when rendering!
            this.realDocument = new RealDocument(this.metadata);
        }
        this.realDocument.render();
    }
}
```

================================================================================
*/

