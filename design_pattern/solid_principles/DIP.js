
// Violates DIP
/**
class SaveToMongo {
   save(cart) {
     console.log("Saving to MongoDB:", cart.getItems());
   }
 }
 
 class ShoppingCart {
   constructor() {
     this.items = [];
     this.saver = new SaveToMongo(); 
   }
 
   addItem(item) {
     this.items.push(item);
   }
 
   getItems() {
     return this.items;
   }
 
   checkout() {
     this.saver.save(this); // directly using Mongo
   }
 }
 
 // usage
 const cart = new ShoppingCart();
 cart.addItem({ name: "Shoes", price: 2000 });
 cart.checkout();

 */


//   Follows DIP (Correct Way)
class CartSaver {
    save(cart) {
        throw new Error("Must implement save()");
    }
}

class SaveToMongo extends CartSaver {
    save(cart) {
        console.log("Saving to MongoDB:", cart.getItems());
    }
}

class SaveToSQL extends CartSaver {
    save(cart) {
        console.log("Saving to SQL:", cart.getItems());
    }
}

class ShoppingCart {
    constructor(saver) {
        this.items = [];
        this.saver = saver; // ✅ injected dependency
    }

    addItem(item) {
        this.items.push(item);
    }

    getItems() {
        return this.items;
    }

    checkout() {
        this.saver.save(this); // works with any saver
    }
}

const mongoSaver = new SaveToMongo();
const sqlSaver = new SaveToSQL();

// inject whichever you want
const cart1 = new ShoppingCart(mongoSaver);
const cart2 = new ShoppingCart(sqlSaver);

cart1.addItem({ name: "Shoes", price: 2000 });
cart1.checkout(); // Mongo

cart2.addItem({ name: "T-shirt", price: 1000 });
cart2.checkout(); // SQL