// Bad Example (Violates SRP)
/** 
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    calculateTotal() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    printInvoice() {
        console.log("Invoice:");
        this.items.forEach(item => {
            console.log(`${item.name} - ${item.price}`);
        });
        console.log("Total:", this.calculateTotal());
    }

    saveToDB() {
        console.log("Saving cart to DB...");
        // pretend DB logic
    }
}

const cart = new ShoppingCart();

cart.addItem({ name: "Shoes", price: 2000 });
cart.addItem({ name: "T-shirt", price: 1000 });

cart.printInvoice();
cart.saveToDB();

*/


// Good Example (Follows SRP)

class ShoppingCart {
    constructor() {
        this.item = []
    }

    addItem(item) {
        this.item.push(item)
    }

    calculateTotal() {
        return this.item.reduce((sum, item) => sum + item.price, 0);
    }
}

class Invoice {
    printInvoice(cart) {
        console.log("Invoice:");
        cart.item.forEach(item => {
            console.log(`${item.name} - ${item.price}`);
        });
        console.log("Total:", cart.calculateTotal());
    }
}

class DB {
    saveToDB(cart) {
        console.log("Saving cart to DB...");
        // pretend DB logic
    }
}

const cart = new ShoppingCart();
const invoice = new Invoice();
const db = new DB();

cart.addItem({ name: "Shoes", price: 2000 });
cart.addItem({ name: "T-shirt", price: 1000 });

invoice.printInvoice(cart);
db.saveToDB(cart);