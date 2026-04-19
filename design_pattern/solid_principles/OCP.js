
// Bad Example (Violates OCP)
/** 
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
        console.log("Item added to cart");
    }

    saveToDB(type) {
        if (type === "mongo") {
            console.log("Saving to MongoDB...");
        } else if (type === "sql") {
            console.log("Saving to SQL...");
        } else if (type === "file") {
            console.log("Saving to File...");
        }
    }
}

let cart  = new ShoppingCart();

cart.addItem({ name: "Shoes", price: 2000 })
cart.addItem({ name: "T-shirt", price: 1000 })

cart.saveToDB("mongo")
cart.saveToDB("sql")

*/

// Good Example (Follows OCP using Extension)

class ShoppingCart {
    constructor() {
        this.items = []
    }

    addItem(item) {
        this.items.push(item);
        console.log("Item added to cart");
    }
}

class CartSaver {
    save(cart) {
      throw new Error("save() must be implemented");
    }
}

class SaveToMongo extends CartSaver{
    save(cart){
        console.log("Data save to MongoDB")
    }
}

class SaveToSQL extends CartSaver{
    save(cart){
        console.log("Data save to SQL")
    }
}

class SaveToFile extends CartSaver{
    save(cart){
        console.log("Data save to File")
    }
}

const cart = new ShoppingCart();

cart.addItem({ name: "Shoes", price: 2000 })
cart.addItem({ name: "T-shirt", price: 1000 })

const sql = new SaveToSQL();
sql.save(cart);

const mongo = new SaveToMongo();
mongo.save(cart);

const file = new SaveToFile();
file.save(cart);