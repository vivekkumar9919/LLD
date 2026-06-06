class Iterator {
    hasNext() { throw new Error("hasNext must be implemented"); }
    next() { throw new Error("next must be implemented"); }
}

class Collection {
    // Parameterized factory method!
    createIterator(options = { strategy: "DEFAULT" }) { 
        throw new Error("createIterator must be implemented"); 
    }
}

// ==========================================
// 1. ARRAY IMPLEMENTATIONS
// ==========================================
class ArrayIterator extends Iterator {
    constructor(items) {
        super();
        this.items = items;
        this.index = 0;
    }
    hasNext() { return this.index < this.items.length; }
    next() { return this.items[this.index++]; }
}

class ReverseArrayIterator extends Iterator {
    constructor(items) {
        super();
        this.items = items;
        this.index = items.length - 1;
    }
    hasNext() { return this.index >= 0; }
    next() { return this.items[this.index--]; }
}

class ArrayCollection extends Collection {
    constructor(items) {
        super();
        this.items = items;
    }
    createIterator(options = { strategy: "DEFAULT" }) {
        if (options.strategy === "REVERSE") {
            return new ReverseArrayIterator(this.items);
        } else if (options.strategy === "DEFAULT") {
            return new ArrayIterator(this.items);
        } else {
            throw new Error(`Strategy '${options.strategy}' is not supported on ArrayCollection`);
        }
    }
}

// ==========================================
// 2. LINKED LIST IMPLEMENTATIONS
// ==========================================
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
    hasNext() { return this.current !== null; }
    next() {
        const value = this.current.data;
        this.current = this.current.next;
        return value;
    }
}

// Note: A true reverse iterator for a singly linked list requires a stack or reversing the list.
// For demonstration, we'll use a stack to yield elements in reverse.
class ReverseLinkedListIterator extends Iterator {
    constructor(head) {
        super();
        this.stack = [];
        let curr = head;
        while(curr) {
            this.stack.push(curr.data);
            curr = curr.next;
        }
    }
    hasNext() { return this.stack.length > 0; }
    next() { return this.stack.pop(); }
}

class LinkedList extends Collection {
    constructor() {
        super();
        this.head = null;
    }
    add(data) {
        const node = new Node(data);
        if (!this.head) { this.head = node; return; }
        let curr = this.head;
        while (curr.next) curr = curr.next;
        curr.next = node;
    }
    createIterator(options = { strategy: "DEFAULT" }) {
        if (options.strategy === "REVERSE") {
            return new ReverseLinkedListIterator(this.head);
        } else if (options.strategy === "DEFAULT") {
            return new LinkedListIterator(this.head);
        } else {
            throw new Error(`Strategy '${options.strategy}' is not supported on LinkedList`);
        }
    }
}

// ==========================================
// 3. TREE IMPLEMENTATIONS
// ==========================================
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// In-Order DFS Iterator
class TreeDFSIterator extends Iterator {
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
    hasNext() { return this.stack.length > 0; }
    next() {
        const node = this.stack.pop();
        this.pushLeft(node.right);
        return node.value;
    }
}

// Level-Order BFS Iterator
class TreeBFSIterator extends Iterator {
    constructor(root) {
        super();
        this.queue = [];
        if (root) this.queue.push(root);
    }
    hasNext() { return this.queue.length > 0; }
    next() {
        const node = this.queue.shift();
        if (node.left) this.queue.push(node.left);
        if (node.right) this.queue.push(node.right);
        return node.value;
    }
}

class BinaryTree extends Collection {
    constructor(root) {
        super();
        this.root = root;
    }
    createIterator(options = { strategy: "DEFAULT" }) {
        if (options.strategy === "BFS") {
            return new TreeBFSIterator(this.root);
        } else if (options.strategy === "DEFAULT" || options.strategy === "DFS") {
            return new TreeDFSIterator(this.root);
        } else {
            throw new Error(`Strategy '${options.strategy}' is not supported on BinaryTree`);
        }
    }
}


// ==========================================
// CLIENT CODE (COMPLETELY GENERIC!)
// ==========================================

// The generic client function takes an options object!
// It doesn't care if it's an Array, LinkedList, or Tree.
function genericPrint(collection, strategyName) {
    try {
        console.log(`\nAttempting Traversal Strategy: ${strategyName}`);
        const iterator = collection.createIterator({ strategy: strategyName });
        
        let output = [];
        while (iterator.hasNext()) {
            output.push(iterator.next());
        }
        console.log(`Success -> ${output.join(', ')}`);
    } catch (error) {
        // Handle cases where a collection doesn't support a specific strategy
        console.log(`Failed -> ${error.message}`);
    }
}

console.log("==========================================");

const arr = new ArrayCollection([10, 20, 30]);
const list = new LinkedList();
list.add("A"); list.add("B"); list.add("C");

const root = new TreeNode(100);
root.left = new TreeNode(50);
root.right = new TreeNode(150);
const tree = new BinaryTree(root);

// --- ARRAY TESTS ---
console.log("\nTesting ArrayCollection...");
genericPrint(arr, "DEFAULT");
genericPrint(arr, "REVERSE");
genericPrint(arr, "BFS"); // This will fail correctly!

// --- LINKED LIST TESTS ---
console.log("\nTesting LinkedList...");
genericPrint(list, "DEFAULT");
genericPrint(list, "REVERSE");

// --- TREE TESTS ---
console.log("\nTesting BinaryTree...");
genericPrint(tree, "DFS"); // In-Order
genericPrint(tree, "BFS"); // Level-Order
genericPrint(tree, "REVERSE"); // This will fail correctly!
