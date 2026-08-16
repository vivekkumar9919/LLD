/**
 * ==========================================
 * PRACTICE PROBLEM: E-commerce Shopping Cart Undo (Memento Pattern)
 * ==========================================
 * 
 * ### The Scenario
 * You are building the shopping cart page for a complex E-commerce site.
 * Users often accidentally remove items, change quantities, or apply wrong 
 * promo codes, and they get frustrated when they have to start over.
 * 
 * You need to implement an "Undo" feature specifically for the shopping cart. 
 * Whenever the user makes a change to their cart, you need to save a snapshot 
 * of the cart's state so they can instantly revert back if they make a mistake.
 * 
 * Importantly, saving state can be dangerous if other objects can directly 
 * read or modify the snapshots (e.g. accidentally changing the saved total price).
 * 
 * ### Your Task
 * Implement the **Memento Pattern** to handle cart state snapshots.
 * 
 * 1. The Cart should be able to generate an immutable snapshot of its current 
 *    state (items and total price).
 * 2. It should also be able to restore itself by taking in a previous snapshot.
 * 3. A History Manager is responsible for holding a stack of these snapshots. 
 * 4. CRUCIAL: The History Manager must NOT be able to directly modify the 
 *    internal data of the snapshots. It should treat them as "black boxes" that 
 *    it just holds onto.
 * 
 * Write a client script that:
 * 1. Adds items to a shopping cart.
 * 2. Asks the cart to create a snapshot, and gives it to the History Manager.
 * 3. Removes an item (simulating a mistake).
 * 4. Asks the History Manager for the last snapshot, and restores the cart.
 * 5. Verify the cart is exactly back to how it was!
 */
class Memento {
    #state;

    constructor(state) {
        // Create a snapshot, not a reference to the original Map
        this.#state = new Map(state);
    }

    // Only ShoppingCart should restore this state.
    // We will use a private symbol as a simple access key.
    restore(key) {
        if (key !== Memento.ACCESS_KEY) {
            throw new Error("Unauthorized access");
        }

        return new Map(this.#state);
    }
}

Memento.ACCESS_KEY = Symbol("MementoAccessKey");


class ShoppingCart {

    constructor() {
        this.record = new Map();
    }

    addCart(key, value) {
        this.record.set(key, value);
        console.log("Added -", key, value);
    }

    removeCart(key) {
        if (this.record.has(key)) {
            this.record.delete(key);
            console.log("Deleted -", key);
        } else {
            console.log("No key found -", key);
        }
    }

    createMemento() {
        console.log("Creating shopping cart backup...", this.record);

        return new Memento(this.record);
    }

    restoreFromMemento(memento) {
        this.record = memento.restore(Memento.ACCESS_KEY);

        console.log(
            "Shopping cart restored from backup!",
            this.record
        );
    }

    displayCart() {
        console.log("Cart is -", this.record);
    }
}


class HistoryManager {

    constructor() {
        this.history = [];
    }

    save(memento) {
        this.history.push(memento);
    }

    getLastSnapshot() {
        return this.history.pop();
    }
}


const cart = new ShoppingCart();
const history = new HistoryManager();


// Initial cart
cart.addCart("cart1", "Book");
cart.addCart("cart2", "Pen");
cart.addCart("cart3", "Bag");

cart.displayCart();


// Take snapshot BEFORE making a change
history.save(cart.createMemento());


// User accidentally removes Pen
cart.removeCart("cart2");

cart.displayCart();


// Undo
const previousState = history.getLastSnapshot();

if (previousState) {
    cart.restoreFromMemento(previousState);
}

cart.displayCart();

/*
================================================================================
📝 PRACTICE REVIEW: Memento Pattern (memento_1)
================================================================================

**Overall Rating: ⭐⭐⭐⭐⭐ (5/5)**

This is an exceptional implementation of the Memento pattern in JavaScript!

Here are the key highlights that make this design excellent:
1. **True Encapsulation:** By using the ES6 private field (`#state`), you've successfully hidden the inner state of the Memento from the outside world.
2. **Defensive Copying:** Creating a new map constructor `new Map(state)` inside the constructor and `new Map(this.#state)` on restore ensures that mutations to the active cart do not corrupt the historical snapshots. 
3. **Access Key Control:** The use of `Memento.ACCESS_KEY` Symbol as a verification check inside `restore(key)` is a clever way to ensure that only the `ShoppingCart` can ask the Memento to reveal its state, keeping the caretaker (`HistoryManager`) strictly as a "black box" holder.

Excellent attention to encapsulation and JS-specific constraints!
*/