class FileSystem {
    ls() {
        throw new Error("ls method should be implemented");
    }

    openAll() {
        throw new Error("openAll method should be implemented");
    }

    getSize() {
        throw new Error("getSize method should be implemented");
    }

    getName() {
        throw new Error("getName method should be implemented");
    }

    isFolder() {
        throw new Error("isFolder method should be implemented");
    }
}

class File extends FileSystem {
    constructor(name, size) {
        super();
        this.name = name;
        this.size = size;
    }

    ls() {
        console.log(`File: ${this.name}`);
    }

    openAll() {
        console.log(`Opening file: ${this.name}`);
    }

    getSize() {
        return this.size;
    }

    getName() {
        return this.name;
    }

    isFolder() {
        return false;
    }
}

class Folder extends FileSystem {
    constructor(name) {
        super();
        this.name = name;
        this.children = [];
    }

    add(item) {
        this.children.push(item);
    }

    remove(itemName) {
        this.children = this.children.filter(
            item => item.getName() !== itemName
        );
    }

    ls() {
        console.log(`Folder: ${this.name}`);

        for (const child of this.children) {
            child.ls();
        }
    }

    openAll() {
        console.log(`Opening folder: ${this.name}`);

        for (const child of this.children) {
            child.openAll();
        }
    }

    getSize() {
        let total = 0;

        for (const child of this.children) {
            total += child.getSize();
        }

        return total;
    }

    getName() {
        return this.name;
    }

    isFolder() {
        return true;
    }
}


const file1 = new File("resume.pdf", 10);
const file2 = new File("photo.png", 20);
const file3 = new File("movie.mp4", 100);

const documents = new Folder("Documents");
documents.add(file1);
documents.add(file2);

const media = new Folder("Media");
media.add(file3);

const root = new Folder("Root");
root.add(documents);
root.add(media);

root.ls();

console.log("Total size:", root.getSize());

// root.openAll();

/**
 * 🎙️ INTERROGATION - LLD REVIEWER
 * 
 * 1. Transparency vs. Safety: You chose NOT to put `add()` and `remove()` in the 
 *    base `FileSystem` class. This is called the "Safety" approach because a client 
 *    can't accidentally call `file1.add()`. However, the "Transparency" approach 
 *    puts them in the base class (throwing an error for Leaves) so the client can 
 *    treat ALL nodes exactly identical without ever checking `isFolder()`. 
 *    Which approach is better for LSP (Liskov Substitution Principle), and why?
 * 
 * 2. The Performance Trap: Imagine your `Root` folder has 1,000,000 deeply nested 
 *    files. Calling `root.getSize()` forces a massive, synchronous recursive loop 
 *    that will freeze the main thread. How would you redesign the Composite pattern 
 *    here to make `getSize()` an O(1) instantaneous operation at the Root level?
 * 
 * 3. The Infinite Loop Trap: What happens to your `getSize()` or `ls()` methods 
 *    if I do this:
 *    `documents.add(root);`
 *    How do you prevent this architectural vulnerability in a Composite structure?
 * 
 * --- VIVEK'S ANSWERS ---
 * 
 * 1. in my current implmenations i will go with safety approach where i keep 
 *    add and remove methods in the folder class only this is because if i add them in 
 *    base class then it unnecessarilly implemention in file class which is not required 
 *    its voliations of ISP 
 * 2.  we do not need to block the thread we can use in async function and 
 *     return promise and resolve when all the files are processed and 
 *     to design in better way we can use a extra space like map where we can store 
 *     current folder and its all child size through which we can get in O(1) time complexity
 * 3.      add(item) {

        // Prevent self add
        if (item === this) {
            throw new Error("Cannot add folder to itself");
        }

        // Prevent cyclic dependency
        if (item instanceof Folder && item.contains(this)) {
            throw new Error("Cyclic dependency detected");
        }

        this.children.push(item);
    }
 * 
 * --- AI EVALUATION ---
 * 1. RIGHT: Excellent connection to ISP (Interface Segregation Principle). 
 *    Transparency gives you perfect LSP, but it forces Leaf nodes to 
 *    implement methods they don't need, violating ISP. Safety respects ISP at 
 *    the cost of slightly weakening LSP.
 * 2. MISSING/RIGHT: Making it async prevents thread blocking (good), but 
 *    doesn't reduce computation. Your "map" idea is on the right track: 
 *    Caching! In a robust Composite, the `Folder` caches its `size`.
 *    When `add()` or `remove()` is called, it invalidates its cache 
 *    (and tells its parent to invalidate theirs). This makes `getSize()` 
 *    O(1) for subsequent reads.
 * 3. RIGHT: Perfect execution. You identified that a Composite structure 
 *    must remain a Directed Acyclic Graph (DAG). Preventing self-addition 
 *    and circular references (`item.contains(this)`) completely eliminates 
 *    the infinite loop vulnerability.
 * 
 */