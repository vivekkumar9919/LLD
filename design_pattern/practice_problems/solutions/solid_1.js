
/**
 * **solid_1** (SRP): Refactor a monolithic `OrderProcessor` 
 * class that currently calculates tax, applies discounts, 
 * generates a PDF receipt, and saves to the DB 
 * into strictly separate classes.
 */

// Monolithic Solution

/** 
class OrderProcessor {

    processOrder(order) {
        this.calculateTax(order);
        this.applyDiscounts(order);
        this.generateReceipt(order);
        this.saveToDatabase(order);
    }
    calculateTax(order) {
        console.log("Calculating tax for order", order);
        order.price = order.price + (order.price * 0.1);
    }
    applyDiscounts(order) {
        console.log("Applying discounts for order", order);
        order.price = order.price - (order.price * 0.1);
    }
    generateReceipt(order) {
        console.log("Generating receipt for order", order);
        order.receipt = `Order Total: ${order.price}`;
    }
    saveToDatabase(order) {
        console.log("Saving order to database", order);
        order.saved = true;
    }
}

class Order {
    constructor(price) {
        this.price = price;
        this.saved = false;
    }
}

const order = new Order(100);
const processor = new OrderProcessor();
processor.processOrder(order);

*/

// SRP Solutions

class OrderProcessor {
    constructor() {
        this.taxCalculator = new TaxCalculator();
        this.discountsCalculator = new DiscountsCalculator();
        this.receiptGenerator = new ReceiptGenerator();
        this.databaseSaver = new DatabaseSaver();
    }

    processOrder(order) {
        this.taxCalculator.calculateTax(order);
        this.discountsCalculator.applyDiscounts(order);
        this.receiptGenerator.generateReceipt(order);
        this.databaseSaver.saveToDatabase(order);
    }

}
class TaxCalculator {
    calculateTax(order) {
        console.log("Calculating tax for order", order);
        order.price = order.price + (order.price * 0.1);
    }
}

class DiscountsCalculator {
    applyDiscounts(order) {
        console.log("Applying discounts for order", order);
        order.price = order.price - (order.price * 0.1);
    }
}

class ReceiptGenerator {
    generateReceipt(order) {
        console.log("Generating receipt for order", order);
        order.receipt = `Order Total: ${order.price}`;
    }
}

class DatabaseSaver {
    saveToDatabase(order) {
        console.log("Saving order to database", order);
        order.saved = true;
    }
}

// Order Class
class Order {
    constructor(price) {
        this.price = price;
        this.saved = false;
    }
}

const order = new Order(100);
const processor = new OrderProcessor();
processor.processOrder(order);

/**
 * 🎙️ INTERROGATION - LLD REVIEWER
 * 
 * 1. The "Inheritance" Trap: Why did you choose to create separate classes 
 *    instead of just having OrderProcessor inherit from a BaseCalculator 
 *    and a BaseSaver? Wouldn't that be "cleaner" and require less boilerplate?
 * 
 * 2. The "Static" Temptation: Since TaxCalculator has no state (it just has 
 *    one method), why not just make the method static? What is the downside 
 *    of using TaxCalculator.calculate(order) instead of instantiating it?
 * 
 * 3. Misleading Question: If I add a validateOrder() method inside 
 *    OrderProcessor right now, aren't I technically giving it a second 
 *    responsibility (Validation)? Should I create a separate OrderValidator 
 *    class, or is that just over-engineering?
 * 
 * --- VIVEK'S ANSWERS ---
 * 
 * 1. We cannot use inheritance here. Inheritance is for "is-a" relationships or shared behavior. 
 *    Composition is better for disparate responsibilities. Inheritance would bloat the 
 *    OrderProcessor with unnecessary base class functions.
 * 
 * 2. [VIVEK TO ANSWER: Why choose instances over static methods for Polymorphism/DI?]
 * 
 * 3. We should create a separate OrderValidator class. OrderProcessor is an orchestrator;
 *    if we add validation logic here, it gains a second responsibility (Business Logic). 
 *    Keeping it separate ensures we don't have to modify the orchestrator for every 
 *    validation rule change.
 * 
 */
