/**
 * ==========================================
 * PRACTICE PROBLEM: E-commerce Order Fulfillment (Mediator Pattern)
 * ==========================================
 * 
 * ### The Scenario
 * You are building the backend for an E-commerce system. When an order is placed, 
 * three separate services need to do their jobs in a specific sequence:
 * 1. The Inventory Service needs to check stock and reserve the items.
 * 2. The Payment Service needs to process the credit card.
 * 3. The Shipping Service needs to print a shipping label.
 * 
 * In a badly designed system, the Inventory Service might directly call the Payment 
 * Service, which then directly calls the Shipping Service. This creates a tangled 
 * web of tight coupling, making it impossible to reuse the services independently.
 * 
 * ### Your Task
 * Build a system using the **Mediator Pattern** to completely decouple these services.
 * 
 * 1. The services (Inventory, Payment, Shipping) must have absolutely no knowledge 
 *    of each other. They cannot import, reference, or call each other directly.
 * 2. Instead, they should only communicate with a central "Mediator" (Orchestrator).
 * 3. When a service finishes a task, it simply notifies the Mediator. The Mediator 
 *    contains the brain/logic to decide which service should be called next based 
 *    on the event.
 * 
 * Write a client script that:
 * 1. Instantiates the Mediator and the three services.
 * 2. Connects the services to the Mediator.
 * 3. Simulates a customer placing an order by triggering the first step, and verify 
 *    that the Mediator correctly orchestrates the entire flow from Inventory -> Payment 
 *    -> Shipping!
 */


class IMediator {
    notify() {
        throw new Error("Notify method must be implemented");
    }
}

class CommerceMediator extends IMediator {
    constructor() {
        super();
        this.handlers = {};
    }
    
    subscribe(event, callback) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        this.handlers[event].push(callback);
    }

    notify(sender, event) {
        if (this.handlers[event]) {
            this.handlers[event].forEach(cb => cb(sender));
        }
    }
}

class Inventory {
    constructor(mediator) {
        this.mediator = mediator;
        this.items = {};
    }
    reserveItems() {
        console.log("Items reserved");
        this.mediator.notify(this, "inventory_reserved");
    }
    setMediator(mediator) {
        this.mediator = mediator;
    }
}

class Payment {
    constructor(mediator) {
        this.mediator = mediator;
    }
    processPayment() {
        console.log("Payment processed");
        this.mediator.notify(this, "payment_processed");
    }
    setMediator(mediator) {
        this.mediator = mediator;
    }
}

class Shipping {
    constructor(mediator) {
        this.mediator = mediator;
    }
    getShippingLabel() {
        console.log("Shipping label generated");
        this.mediator.notify(this, "shipping_generated");
    }
    setMediator(mediator) {
        this.mediator = mediator;
    }
}


const inventory = new Inventory();
const payment = new Payment();
const shipping = new Shipping();

const mediator = new CommerceMediator();

// Give the services a reference to the mediator so they can call `notify`
inventory.setMediator(mediator);
payment.setMediator(mediator);
shipping.setMediator(mediator);

// Dynamically wire up the orchestration logic!
mediator.subscribe("inventory_reserved", () => payment.processPayment());
mediator.subscribe("payment_processed", () => shipping.getShippingLabel());
mediator.subscribe("shipping_generated", () => console.log("Order completed"));

inventory.reserveItems();

/*
================================================================================
📝 PRACTICE REVIEW: Mediator Pattern (mediator_1)
================================================================================

**Overall Rating: ⭐⭐⭐⭐⭐ (5/5)**

You flawlessly executed the Mediator pattern! You correctly removed all direct dependencies between the services. The `Inventory`, `Payment`, and `Shipping` classes have absolutely no idea that the others exist—they only know how to yell `this.mediator.notify(...)` when they finish their job.

By centralizing the control flow inside `CommerceMediator.notify()`, you've made it incredibly easy to change the order of operations in the future (e.g., adding a "FraudCheckService" before Payment) without having to rewrite any of the existing service classes.

This is exactly how complex UI components and microservice orchestrators manage state without turning into spaghetti code. Great job!

---
**💡 Interview Insight: The "God Object" Bottleneck**
You correctly identified the biggest flaw of the pure Mediator Pattern: as you add more services, the `notify()` method grows into a massive `if/else` block (a "God Object"). 

If an interviewer asks how to fix this, the answer is to combine the **Mediator Pattern** with the **Observer (Pub/Sub) Pattern**. 

Instead of hardcoding `if/else` statements, you turn the Mediator into an **Event Bus**:
```javascript
class EventMediator {
    constructor() { this.handlers = {}; }
    
    subscribe(event, callback) {
        if (!this.handlers[event]) this.handlers[event] = [];
        this.handlers[event].push(callback);
    }
    
    notify(sender, event) {
        if (this.handlers[event]) {
            this.handlers[event].forEach(cb => cb(sender));
        }
    }
}
// Usage: eventBus.subscribe("inventory_reserved", () => payment.processPayment());
```
This removes the hardcoded logic and makes the sequence 100% dynamic!
*/
