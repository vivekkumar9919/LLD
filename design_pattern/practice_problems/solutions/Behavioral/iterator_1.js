/**
 * ==========================================
 * PRACTICE PROBLEM: Native JS Iterable (Iterator Pattern)
 * ==========================================
 * 
 * ### The Scenario
 * You are building a frontend application that fetches a massive list of 100 
 * data records (e.g., users, products, or logs) from an API. 
 * 
 * Instead of rendering all 100 records on the screen at once (which would freeze 
 * the browser), you want to process and display them in "pages" of 10 records 
 * at a time.
 * 
 * You want the client code to be as clean as possible. The client shouldn't 
 * have to manually keep track of `currentIndex` or `pageNumber` or slice arrays 
 * manually. They should just be able to write a native JavaScript `for...of` loop!
 * 
 * ### Your Task
 * Build a custom data collection object that acts as a true Iterator.
 * 
 * 1. Create a collection that holds an array of 100 items.
 * 2. Implement the Iterator Pattern so that this collection natively hooks into 
 *    JavaScript's iteration protocols. 
 * 3. When a developer loops over the collection, it should yield a "chunk" or 
 *    "page" of exactly 10 items per iteration, rather than yielding 1 item at 
 *    a time.
 * 
 * Write a client script that:
 * 1. Instantiates your collection with 100 dummy items.
 * 2. Uses a native `for (const page of myCollection)` loop.
 * 3. `console.log`s each page. You should see exactly 10 arrays printed, each 
 *    containing exactly 10 items!
 */





class Iterator {
    constructor() {

    }
    hasNext() {
        throw new Error("hasNext must be implemented");
    }
    next() {
        throw new Error("next must be implemented");
    }
    [Symbol.iterator]() {
        return this;
    }

}
class PageCollection extends Iterator {
    constructor(items, pageNumber, pageSize) {
        super();
        this.items = items;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }

    hasNext() {
        return this.pageNumber < this.items.length / this.pageSize;
    }

    next() {
        if (!this.hasNext()) {
            return { value: undefined, done: true };
        }

        const start = this.pageNumber * this.pageSize;
        const end = start + this.pageSize;

        const page = this.items.slice(start, end);

        this.pageNumber++;

        return {
            value: page,
            done: false
        };
    }


}

// Here is 100 dummy items for you to use!
const dummyData = Array.from({ length: 100 }, (_, i) => i + 1);


const pageCollection = new PageCollection(dummyData, 0, 10);
// console.log(pageCollection.next());
for (const page of pageCollection) {
    console.log(page);
}

/*
================================================================================
📝 PRACTICE REVIEW: Iterator Pattern (iterator_1)
================================================================================

**Overall Rating: ⭐⭐⭐⭐⭐ (5/5)**

You absolutely nailed this! You correctly identified that JavaScript's native iteration protocol requires the `[Symbol.iterator]()` method, and returning `this` was the perfect move since your class already implements the required `next()` signature. 

Your pagination math inside `next()` using `slice()` was completely flawless. By encapsulating this state (`pageNumber` and `pageSize`), the client code at the bottom is incredibly clean: a simple native `for...of` loop.

This is exactly how professional libraries wrap complex data structures to make them feel like native JavaScript types. Great job!
*/

