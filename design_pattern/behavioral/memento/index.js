

const mementoKey = Symbol('DatabaseMementoKey');

class DatabaseMemento {
    #data;

    constructor(dbData, key) {
        if (key !== mementoKey) {
            throw new Error("Access Denied: Only Database can instantiate DatabaseMemento");
        }
        this.#data = dbData;
    }

    getState(key) {
        if (key !== mementoKey) {
            throw new Error("Access Denied: Only Database can retrieve state from DatabaseMemento");
        }
        return this.#data;
    }
}

class Database {
    constructor() {
        this.record = new Map();
    }

    insert(key, value) {
        this.record.set(key, value);
        console.log("Inserted -", key, value);
    }

    update(key, value) {
        if (this.record.has(key)) {
            this.record.set(key, value);
            console.log("Updated -", key, value);
        } else {
            console.log("No keys found to update", key, value);
        }
    }

    remove(key) {
        if (this.record.has(key)) {
            this.record.delete(key);
            console.log("Deleted -", key);
        } else {
            console.log("No key found to delete", key);
        }
    }

    createMemento() {
        console.log("Creating database backup...", this.record);
        return new DatabaseMemento(new Map(this.record), mementoKey);
    }

    restoreFromMemento(memento) {
        this.record = new Map(
            memento.getState(mementoKey)
        );

        console.log(
            "Database restored from backup!",
            this.record
        );
    }

    displayRecord() {
        console.log("Record is -", this.record);
    }
}

class TransactionManager {
    constructor() {
        this.backup = null;
    }
    beginTransaction(database) {
        console.log("=== Begin Transaction ===");
        if (this.backup) {
            this.backup = null;
        }
        this.backup = database.createMemento();
    }
    commitTransaction(database) {
        console.log("=== Commit Transaction ===");
        if (this.backup) {
            this.backup = null;
        }
    }
    rollbackTransaction(database) {
        console.log("=== Rollback Transaction ===");
        if (this.backup) {
            database.restoreFromMemento(this.backup);
            this.backup = null;
        }
        else {
            console.log("No backup for rollback");
        }
    }

}

const db = new Database();
const txManager = new TransactionManager();

txManager.beginTransaction(db);
db.insert("name", "vivek");
db.insert("age", 24)
txManager.commitTransaction(db)
db.displayRecord();

txManager.beginTransaction(db);
db.insert("num", 493923892);
txManager.rollbackTransaction(db);
db.displayRecord();

/*
================================================================================
INTERROGATION QUESTIONS (Memento Pattern)
================================================================================
1. Why does DatabaseMemento expose the data state via the public method getState()?
   Doesn't this completely violate the core encapsulation guideline of the Memento
   pattern by allowing the Caretaker (TransactionManager) or any external client to
   inspect, read, or even directly modify the database's internal state?
   How would you refactor DatabaseMemento to prevent the Caretaker from accessing or
   modifying the state, while still allowing the Database (Originator) to restore from it?

2. Your current implementation of createMemento copies the entire Map database state
   (new Map(this.record)) for every single transaction backup. In a real-world database
   context with millions of records, copying the entire state on every transaction is
   highly inefficient in terms of CPU and memory.
   How would you redesign the backup/rollback mechanism using a different approach
   (e.g., Command history, event sourcing, or delta-based state tracking) to optimize
   both space and time? What trade-offs do these alternatives introduce?

3. Look closely at the remove() method in your Database class. If the client code called
   db.remove("name") during a transaction, what would happen? What does this tell you
   about your manual code verification process before submitting for review?

Please answer these questions directly below this comment block. Once you respond,
I will append the AI Evaluation of your answers.
================================================================================

1. Does getState() violate Memento encapsulation?
Yes. getState() exposes the internal database state to the Caretaker (TransactionManager) and other clients, 
     allowing them to inspect or modify the snapshot.
     Better approach: Make the memento opaque. The Caretaker should only store the 
     memento, while only the Database (Originator) can restore from it. This preserves 
     encapsulation.
2. Why is copying the entire Map inefficient?
    Current approach:
    new Map(this.record)
    creates a full copy of the database for every transaction.
    Problem:
    Time: O(N)
    Space: O(N)
    For millions of records, this becomes expensive.
    Alternatives:
    Command Pattern: Store operations and undo them during rollback.
    Delta Tracking: Store only changed keys and their old values.
    Event Sourcing: Store events instead of full state.
    Trade-off: Better memory efficiency but increased implementation complexity.

3. What's wrong with remove()?
    Current method has multiple bugs:
    Missing key parameter.
    Uses this.myMap instead of this.record.
    Uses undefined variable value.
    Calling:
    db.remove("name");
    will throw a runtime error.
    Correct version:
    remove(key) {
        if (this.record.has(key)) {
            this.record.delete(key);
            console.log("Deleted -", key);
        }
    }

--------------------------------------------------------------------------------
--- AI EVALUATION ---
--------------------------------------------------------------------------------
### Question 1: Memento Encapsulation
* **What is right:** Correctly identifies that exposing `getState()` to caretakers/clients breaks encapsulation. Properly explains that the caretaker should treat the memento as an opaque metadata holder.
* **What is missing:** Did not describe *how* to implement opacity in JavaScript/Node.js, where access control keywords like `private` are absent. A standard solution in JS is using ES6 class private fields (e.g., `#data`) so that only classes defined within a specific scope/module or the originator itself can unpack it, or passing an internal verification key to the getter.

### Question 2: O(N) Copying Performance & Scale
* **What is right:** Perfectly articulated the O(N) time and space overhead of cloning database Maps. Provided a comprehensive list of alternatives including Command History (Undo/Redo), Delta/State diff tracking, and Event Sourcing, while correctly identifying the memory vs. implementation complexity tradeoffs.
* **What is missing:** None. Excellent architectural analysis.

### Question 3: Broken remove() Bug Identification
* **What is right:** Accurately spotted all three critical errors (missing parameter, referencing `this.myMap` instead of `this.record`, and referencing undefined `value` or `key`). Provided the correct fix.
* **What is missing:** In interviews, senior engineers expect candidates to own their verification process. Ensure you run/test all code paths (especially deletes/errors) rather than just validating the happy path insertion logic.
--------------------------------------------------------------------------------
*/
