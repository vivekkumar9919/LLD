
class Iterator {

    hasNext() {
        throw new Error("hasNext must be implemented");
    }

    next() {
        throw new Error("next must be implemented");
    }
}

class Collection {

    createIterator() {
        throw new Error("createIterator must be implemented");
    }
}

class ArrayIterator extends Iterator {

    constructor(items) {
        super();
        this.items = items;
        this.index = 0;
    }

    hasNext() {
        return this.index < this.items.length;
    }

    next() {
        return this.items[this.index++];
    }
}
class ArrayCollection extends Collection {

    constructor(items) {
        super();
        this.items = items;
    }

    createIterator() {
        return new ArrayIterator(this.items);
    }
}

class Node {

    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListIterator extends Iterator {

    constructor(head) {
        super();
        this.current = head;
    }

    hasNext() {
        return this.current !== null;
    }

    next() {

        const value = this.current.data;

        this.current = this.current.next;

        return value;
    }
}

class LinkedList extends Collection {

    constructor() {
        super();
        this.head = null;
    }

    add(data) {

        const node = new Node(data);

        if (!this.head) {
            this.head = node;
            return;
        }

        let curr = this.head;

        while (curr.next) {
            curr = curr.next;
        }

        curr.next = node;
    }

    createIterator() {
        return new LinkedListIterator(this.head);
    }
}

// tree ----------------
class TreeNode {

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinaryTreeIterator extends Iterator {

    constructor(root) {
        super();

        this.stack = [];

        this.pushLeft(root);
    }

    pushLeft(node) {

        while (node) {

            this.stack.push(node);

            node = node.left;
        }
    }

    hasNext() {
        return this.stack.length > 0;
    }

    next() {

        const node = this.stack.pop();

        this.pushLeft(node.right);

        return node.value;
    }
}
class BinaryTree extends Collection {

    constructor(root) {
        super();
        this.root = root;
    }

    createIterator() {
        return new BinaryTreeIterator(this.root);
    }
}


// clients

function printCollection(collection) {

    const iterator =
        collection.createIterator();

    while (iterator.hasNext()) {
        console.log(iterator.next());
    }
}

const arr =
    new ArrayCollection([1, 2, 3]);

printCollection(arr);


const list = new LinkedList();
list.add(10);
list.add(20);
list.add(30);
printCollection(list);


const root = new TreeNode(10);

root.left = new TreeNode(5);
root.right = new TreeNode(15);

root.left.left = new TreeNode(2);
root.left.right = new TreeNode(7);

const tree =
    new BinaryTree(root);

printCollection(tree);

/**
 * 🎙️ INTERROGATION - LLD REVIEWER
 * 
 * 1. Tree Traversal Variations: Your `BinaryTreeIterator` traverses the tree in an In-Order fashion 
 *    (Left -> Root -> Right). How would you modify the system if a client wanted to iterate over 
 *    the same `BinaryTree` *Level-by-Level* (Breadth-First Search) instead? Would you change the 
 *    Tree class or create a new Iterator class? How would the client request it?
 * 
 * 2. JavaScript Iterables: You built a classic GoF Iterator (`hasNext()` and `next()`). However, 
 *    JavaScript has native Iterators and the `Iterable` protocol. How would you refactor your 
 *    `ArrayCollection` so the client can just use native JS syntax: `for (const item of arr) { ... }`?
 * 
 * 3. State Integrity (Concurrent Modification): What happens to your `ArrayIterator` or `LinkedListIterator` 
 *    if another part of the program adds or removes an item from the collection *while* the iterator 
 *    is halfway through traversing it? Is it safe? If not, how do iterators in strict languages like Java 
 *    handle this (e.g., ConcurrentModificationException)?
 * 
 * --- VIVEK'S ANSWERS ---
 * 1. In current implementation clients is unaware about the traversal types and type to 
 *    Data structure is used if we need to add level wise traveral then client should 
 *    be aware about the traversal type and type of data structure so that can pass 
 *    the parametrs which is volations of ISP to implement such type of traversal 
 *    we need more methods in iterator like typeof list , based on list we can give the allowd methods like for 
 *    binary we can have type of traversal , and for array we can have travers from end and 
 *    so on then at client side first client check type and allowd methods based on that
 *    it will call but it will volate the ISP
 * 
 * 2. NA
 * 
 * 3. For concurrent modification we can use multiples way 
 *    1. we can keep one flag there when start iteration we set it to true and when iteration 
 *    finishes we set it to false so if its true we will not allow to modify lock mechanism
 *    2. Before start we can create a new copy of the collections so modification will not impact
 *    
 * --- AI EVALUATION ---
 * 1. PARTIALLY RIGHT: You are correct that forcing the client to know the data structure violates ISP and polymorphism. 
 *    The correct solution is much simpler! Just add different factory methods on the `BinaryTree` collection itself:
 *    `createInOrderIterator()` and `createLevelOrderIterator()`. The client still receives a standard `Iterator` 
 *    and doesn't need to know how it works under the hood.
 * 2. JS NATIVE ITERATORS: To use `for (const item of arr)`, you implement the native `[Symbol.iterator]` method:
 *    ```javascript
 *    class ArrayCollection {
 *        // ...
 *        [Symbol.iterator]() {
 *            let index = 0;
 *            let items = this.items;
 *            return {
 *                next: () => {
 *                    if (index < items.length) return { value: items[index++], done: false };
 *                    return { done: true };
 *                }
 *            };
 *        }
 *    }
 *    ```
 * 3. RIGHT: Excellent! You identified the two main solutions:
 *    - **Fail-Safe Iterator** (Your solution #2): Create a clone of the collection when the iterator is created. Safe, but uses more memory.
 *    - **Fail-Fast Iterator** (Java's approach): The collection keeps a `modCount` variable. Every time an item is added/removed, `modCount++`. The Iterator stores the `expectedModCount` when it is created. During `next()`, if `modCount !== expectedModCount`, it throws a `ConcurrentModificationException`.
 */