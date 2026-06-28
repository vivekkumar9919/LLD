/**
 **builder_2** (E-commerce Order & Director)
 
 ### The Scenario (Interview Style)
 You are building the checkout system for a new e-commerce platform. A customer's 
 `Order` can have several components: items in the cart, a shipping address, a 
 boolean flag for gift wrapping, and an applied discount percentage.
 
 Because an order has so many optional parts, you decide to use a Builder to 
 construct it step-by-step. 

 However, your product manager notices that 90% of the time, users fall into two 
 standard buckets:
 1. **Guest Checkout**: They never get a discount, they get standard shipping, 
    and no gift wrap.
 2. **Premium Member Checkout**: They automatically get a 20% discount, expedited 
    shipping, and free gift wrap.

 ### Your Task
 Instead of making the client code manually call `.setDiscount()`, `.setShipping()`, 
 etc. every single time for these common scenarios, you need to introduce a 
 "manager" or "director" entity. 

 The client should be able to hand an empty builder to this director, and tell 
 the director: "Construct a Premium Member order for me." The director will then 
 execute the correct sequence of builder steps, and the client will just retrieve 
 the final built order. 

 *Note: As per our new rules, I have not given you the exact class names or method 
 names for the Director. You must design the architecture yourself!*
 */

class OrdersBuilder {
    constructor(checkout) {
        this.checkout = checkout;
        this.orderData = {};
    }
    setDiscount(DiscountAmount) {
        if (!DiscountAmount) {
            throw new Error("Amount should pe given")
        }
        this.orderData.discount = DiscountAmount;
        return this;
    }
    setShippingType(type) {
        this.orderData.shipping = type
        return this;
    }
    setGiftWrap(type) {
        this.orderData.wrap = type
        return this;
    }
    resetOrder() {
        console.log("clearing order data...");
        this.orderData = {};
        return this;
    }
    build() {
        console.log("Building orders data ...")
        return this.orderData;
        this.resetOrder();
    }
}

class Order {
    constructor(builder){
        this.builder = builder;
    }
    createGuestOrder(amount){
         return this.builder.setDiscount(amount).setShippingType('Basic').setGiftWrap("Basic Wrap").build();
    }
    createPremiumOrder(amount){
          return this.builder.setDiscount(amount).setShippingType('Premium').setGiftWrap("Premium Wrap").build();
    }
}

const builder = new OrdersBuilder();
const Order1 = new Order(builder).createGuestOrder(100);
console.log("order1 data is ---", Order1)
const Order2 = new Order(builder).createPremiumOrder(100);
console.log("order2 data is ---", Order2)

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK (Iteration 2)
================================================================================
**Rating:** ⭐⭐⭐ (3/5)

### 🚨 Code Issues & Concept Check
Great job pivoting! You successfully ripped out the over-engineered Strategy and Factory classes. 
Your `OrdersBuilder` is now exactly what a Builder should be: "dumb" and focused only on 
collecting state step-by-step.

However, there are a few things keeping you from a 5/5:
1. **The Missing Return:** Your `build()` method in `OrdersBuilder` logs the order and resets 
the state, but it doesn't actually `return` the finalized object! So `const Order1` is 
currently `undefined`. 
2. **Director Dependency Injection:** Your Director (which you named `Order`) is instantiating 
`new OrdersBuilder()` inside the method. In a pure Director pattern, you pass the builder 
*into* the method as an argument: `createGuestOrder(builder, amount)`. Why? Because this 
allows the Director to work with *any* builder (e.g., if you later created an `
XMLOrderBuilder` or `JSONOrderBuilder`, the Director could still drive it!).
3. **Guest Discount:** A guest isn't supposed to get a discount! Your director method passes the 
full `amount` to the discount setter.

### 🧠 Deep Dive Questions
1. **Architectural Trade-offs:** Let's look back at your first attempt (where you created 
`GuestCheckout`, `PremiumCheckout`, `GuestOrder`, `PremiumOrder`). If we had 50 different 
checkout types, you would have had to create 100 new classes! With your new Director approach, 
how many new classes do you have to create to support 50 new checkout types?

**Next Steps:** Make `build()` return the final object, pass the builder into the director methods 
as an argument, drop your answer below, and ping me for the 5/5!
================================================================================
1. In current code we do not need to create any class more we just need to extends the Order
class where we build the order by passing there parameters 

--------------------------------------------------------------------------------
🏆 FINAL EVALUATION
--------------------------------------------------------------------------------
**Rating:** ⭐⭐⭐⭐⭐ (5/5)

**Code Review:** Excellent work on the refactor! By injecting the `builder` into the `Order` (Director) constructor, you successfully decoupled the Director from the concrete Builder class. Now, your Director can take *any* builder that conforms to that interface (like a JSONBuilder or XMLBuilder)! 

Your answer to the Deep Dive is absolutely correct: 0 new classes needed. Just add 1 new method to the Director. That is the true power of this pattern. 

*Minor JS tip:* Remember that `return` exits a function immediately, so your `this.resetOrder()` line at the end of `build()` is unreachable! To return and reset, you'd do:
```javascript
const finalData = { ...this.orderData }; // copy the data
this.resetOrder(); // reset the builder
return finalData; // return the copy
```
(Also, you forgot to set the guest discount to 0 in `createGuestOrder`, but we'll let that slide!)

**Status:** ✅ Completed! 
================================================================================
*/
