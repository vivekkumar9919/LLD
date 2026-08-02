/**
 * ==========================================
 * Problem 9: The LRU Cache (Least Recently Used)
 * ==========================================
 * 
 * ### The Scenario
 * You are tasked with building an in-memory cache to speed up database queries. 
 * However, memory is limited. The cache can only hold a maximum of `N` items.
 * 
 * When the cache reaches its capacity and a new item is added, it must evict the 
 * "Least Recently Used" (LRU) item to make room. 
 * 
 * Core Requirements:
 * 1. Initialize the cache with a specific `capacity`.
 * 2. `get(key)`: Return the value of the key if it exists, otherwise return -1. 
 *    (Accessing a key makes it the MOST recently used).
 * 3. `put(key, value)`: Update the value of the key if it exists, or insert the 
 *    key-value pair if it doesn't. If the cache is at capacity, evict the LEAST 
 *    recently used item before inserting.
 * 
 * ### The O(1) Challenge
 * You must design the data structures such that BOTH `get` and `put` operate in 
 * **O(1) average time complexity**. 
 * (Hint: A simple Array with `push()` and `splice()` is O(N) and will fail the interview).
 * 
 * ### Your Task (Phase 3: MVP)
 * Architect the classes and data structures to support O(1) operations.
 * Write the skeleton classes, and prove your architecture works by writing client 
 * code that:
 * 1. Creates an LRUCache with capacity 2.
 * 2. Puts (1, 1) and (2, 2).
 * 3. Gets 1 (returns 1).
 * 4. Puts (3, 3) (evicts key 2).
 * 5. Gets 2 (returns -1).
 */


class CacheInterFace {
    constructor(capacity) {
        this.capacity = capacity;
    }
    puts(key, value) {
        throw new Error("Method not implemented");
    }
    get(key) {
        throw new Error("Method not implemented");
    }
}

class LRUCache extends CacheInterFace {
    constructor(capacity) {
        super(capacity)
        this.cache = new Map()
        this.list = new DoublyLinkedList();
    }

    puts(key, value, ttl) {
        // convert into node 
        const calculateTTl = Date.now() + ttl;
        const node = new Node(key, value, calculateTTl);
        // check if keys exits 
        let present = this.cache.get(key);
        // if keys present then move tail
        if (present) {
            // ttl is expires
            if (present.ttl < Date.now()) {
                this.list.remove(present);
                this.cache.delete(key);
                return;
            }
            else {
                console.log("Keys is present", { key, value });
                this.list.moveToTail(node);
                return
            }
        }
        else {
            // if keys not present then add in list 
            console.log("list length", this.list.listLength, this.capacity)
            if (this.list.listLength >= this.capacity) {
                let removedNode = this.list.removeHead();
                this.cache.delete(removedNode.key);
            }
            this.list.addToTail(node);
            this.cache.set(key, node);
        }
        this.list.print();
    }

    gets(key) {
        let nodeAddress = this.cache.get(key);
        console.log(nodeAddress.key, nodeAddress.ttl);
        if (!nodeAddress || nodeAddress.ttt < Date.now()) {
            this.list.remove(nodeAddress);
            this.cache.delete(key);
            return { key: null, value: null };
        }
        this.list.moveToTail(nodeAddress);
        this.list.print();
        return { key: nodeAddress.key, value: nodeAddress.value };
    }
}

class CacheStrategy {
    constructor() {
        this.cacheStrategy = null;
    }
    setCacheStrategy(strategy) {
        this.cacheStrategy = strategy;
    }
    puts(key, value, ttl) {
        this.cacheStrategy.puts(key, value, ttl);
    }
    gets(key) {
        return this.cacheStrategy.gets(key);
    }
}


class Node {
    constructor(key, value, ttl) {
        this.key = key;
        this.value = value;
        this.ttl = ttl;

        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null; // LRU
        this.tail = null; // MRU
        this.listLength = 0;
    }

    // Add a node to the end (Most Recently Used)
    addToTail(node) {
        node.prev = null;
        node.next = null;

        // Empty list
        if (!this.head) {
            this.head = node;
            this.tail = node;
            this.listLength += 1
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
        this.listLength += 1
    }

    // Remove any node
    remove(node) {
        if (!node) return;

        // Only node in the list
        if (this.head === node && this.tail === node) {
            this.head = null;
            this.tail = null;
        }

        // Removing head
        else if (node === this.head) {
            this.head = node.next;
            this.head.prev = null;
        }

        // Removing tail
        else if (node === this.tail) {
            this.tail = node.prev;
            this.tail.next = null;
        }

        // Removing middle node
        else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }

        node.prev = null;
        node.next = null;
        this.listLength -= 1
    }

    // Remove the least recently used node
    removeHead() {
        if (!this.head) return null;

        const node = this.head;

        this.remove(node);

        return node;
    }

    // Move a node to the MRU position
    moveToTail(node) {
        if (node === this.tail) return;

        this.remove(node);
        this.addToTail(node);
    }

    print() {
        let curr = this.head;
        const result = [];

        while (curr) {
            result.push(`[${curr.key}:${curr.value}]`);
            curr = curr.next;
        }

        console.log(result.join(" <-> "));
    }
    getLength() {
        return this.listLength;
    }
}

const lruCache = new LRUCache(2);

const cache = new CacheStrategy();
cache.setCacheStrategy(lruCache);
cache.puts(1, 1, 0)
cache.puts(2, 2, 2000)
// cache.puts(3, 3, 3000)
console.log(cache.gets(1));
// cache.puts(4, 4, 4000)
// cache.puts(5, 5, 5000)
// cache.puts(6, 6, 1000)

/*
================================================================================
🤖 FAANG INTERVIEW EVALUATION (Problem 9: LRU Cache)
================================================================================

**1. Requirement Gathering: ⭐⭐⭐⭐⭐ (5/5) - STRONG HIRE**
You immediately recognized that eviction also needed to be O(1) and asked for clarification. You understood the scope perfectly.

**2. Architecture & OOD: ⭐⭐⭐⭐⭐ (5/5) - STRONG HIRE**
You built the classic Map + Doubly Linked List perfectly. You also proactively introduced the Strategy Pattern to show that your cache could easily support FIFO or LIFO in the future. Excellent Staff-level architecture.

**3. Execution & Code Quality: ⭐⭐⭐ (3/5) - LEANING HIRE**
Your logic is correct, but there are a few syntax bugs that would crash in production:
- In `gets()`, you wrote `console.log(nodeAddress.key, nodeAddress.ttl)`. If I call `gets(999)`, `nodeAddress` is undefined, and this line throws a fatal `TypeError`.
- You had a typo in your lazy evaluation: `nodeAddress.ttt < Date.now()`. Because `ttt` is undefined, `undefined < Date.now()` evaluates to `false`. Your TTL expiration silently never triggers!

**4. Edge Cases & Extensibility: ⭐⭐⭐⭐ (4/5) - HIRE**
You correctly caught the edge case where updating an existing key also resets its MRU position, and you successfully patched the memory leak during the MVP phase. 

**5. Iterations & Escalations: ⭐⭐⭐⭐ (4/5) - HIRE**
When pushed to implement the TTL escalation, you immediately recognized that Lazy Evaluation was the correct system design pattern to avoid background cron jobs. Despite the minor typos, your conceptual approach to the escalation was flawless.

**Overall Decision: HIRE.**
You showed incredible architectural foresight and quickly fixed the memory leak when prompted. Just be careful with typos (`ttl` vs `ttt`) and always guard against `undefined` before accessing object properties!
*/


