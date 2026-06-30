/**
 **adapter_1** (Payment Gateway): The Square Peg in a Round Hole
 
 ### The Scenario (Interview Style)
 You are maintaining a legacy e-commerce application. Throughout the entire codebase, 
 you have hundreds of files calling your standard payment interface. Your system 
 relies on a `StripeAdapter` class which has a specific method signature:
 
 ```javascript
 class StripeAdapter {
     pay(amountInDollars) {
         console.log(`Processing $${amountInDollars} via Stripe`);
     }
 }
 ```
 The client code expects this exact interface (`.pay(amount)`).
 
 ### The Problem
 The business team just signed a massive deal with PayPal. They hand you the 
 official `PayPalAPI` class provided by the vendor. It looks like this:
 
 ```javascript
 class PayPalAPI {
     sendPayment(currency, value) {
         console.log(`Routing ${value} ${currency} through PayPal networks.`);
     }
 }
 ```
 You **cannot** modify the `PayPalAPI` class (it's a third-party library), and you 
 **cannot** go through your entire codebase and change every single `.pay()` call to 
 `.sendPayment()`.
 
 ### Your Task
 Implement the **Adapter Pattern**. 
 Create a new class `PayPalAdapter` that implements the standard `.pay(amount)` 
 interface your system expects, but internally translates the call and delegates it 
 to the incompatible `PayPalAPI` class (defaulting to 'USD' for the currency).
 
 Prove it works by writing client code that can use both the `StripeAdapter` and 
 your new `PayPalAdapter` interchangeably!
 */



class StripeAdapter {
    pay(amountInDollars) {
        console.log(`Processing $${amountInDollars} via Stripe`);
    }
}

class PayPalAPI {
    sendPayment(currency, value) {
        console.log(`Routing ${value} ${currency} through PayPal networks.`);
    }
}


class PayPalAdapter {
    constructor(adapter) {
        this.adapter = adapter
    }
    pay(amountInDollars) {
        // new we need to convert into the paypal api format
        const paypal = this.adapter.sendPayment('USD', amountInDollars);
    }
}


const stripe = new StripeAdapter().pay(100);
const paypal = new PayPalAdapter(new PayPalAPI()).pay(100);

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================
**Rating:** ⭐⭐⭐ (3/5)

### 🚨 Code Issues & Concept Check
You successfully translated `.pay()` to `.sendPayment()`. The core mechanism of the 
Adapter works! However, there are two major architectural flaws to fix:

1. **Do not use Inheritance!** You wrote `class PayPalAdapter extends StripeAdapter`. 
But PayPal is *not* a type of Stripe! If `StripeAdapter` had a method called 
`verifyStripeWebhook()`, your PayPal adapter would suddenly inherit it, 
which makes no sense. In JavaScript, you don't need to `extend` a class to 
satisfy its interface. Just build a completely independent class that happens to have 
a `.pay()` method. (This is called "Duck Typing").
2. **Composition over Hardcoding:** In your active `PayPalAdapter`, you hardcoded 
`new PayPalAPI()` right in the middle of the method. That makes it impossible to 
mock during unit testing! But look at your commented-out `PayPalAdapter2`—you passed 
the API into the constructor. That is the correct, professional way to build an 
"Object Adapter" (Composition/Dependency Injection).

*(Small detail: The prompt said to default the currency to 'USD', but you passed 
'$'. Not a huge deal, but standard APIs usually expect ISO codes like 'USD' or 'EUR'.)*

### 🧠 Next Steps
Delete the `extends StripeAdapter`. They should be sibling classes, not parent/child.
Switch to using your `PayPalAdapter2` approach (passing the API via the constructor). 
Clean up the commented code, fix the 'USD' string, and ping me for a re-review!
================================================================================
*/

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK (Interview Discussion)
================================================================================

### 🧠 Deep Dive: Your Question
You asked an **incredibly insightful** question: *"If the client has to pass 
`new PayPalAPI()` into the constructor, doesn't that mean the client is now aware 
of the PayPal format?"*

The answer lies in understanding **who** the "client" is!
In enterprise apps, there are two distinct phases:
1. **The Setup Phase (e.g., Dependency Injection Container, Factory):** This code 
is *supposed* to know about the messy details. It wires everything together.
2. **The Business Logic (The True Client):** This code just receives the 
already-built adapter and uses it.

Here is what it looks like in reality:
```javascript
// 1. SETUP CODE (Knows everything)
const api = new PayPalAPI();
const adapter = new PayPalAdapter(api);
const processor = new OrderProcessor(adapter); // Inject it!

// 2. BUSINESS LOGIC CLIENT (Knows NOTHING!)
class OrderProcessor {
    constructor(paymentMethod) { this.paymentMethod = paymentMethod; }
    
    checkout() {
        // The business logic is blissfully unaware of PayPal or Stripe.
        this.paymentMethod.pay(100); 
    }
}
```
Does that make sense? The business logic is protected, even if the setup code has to do the dirty work!

**Next Steps:** Since you are actively coding, I won't grade this iteration! Just a heads up: you still have `super()` in the constructor (which will throw an error since you removed `extends`), and your test case needs the API passed in. Finish your code and let me know when you're ready for the final review!
================================================================================
*/

/*
--------------------------------------------------------------------------------
🏆 FINAL EVALUATION
--------------------------------------------------------------------------------
**Rating:** ⭐⭐⭐⭐⭐ (5/5)

**Code Review:** Perfect execution! You built a robust **Object Adapter**.
By using Dependency Injection (`constructor(adapter)`), you made the class highly 
testable. By removing the `extends` keyword, you correctly adhered to 
**Duck Typing**, avoiding the architectural nightmare of inheriting unrelated methods.

You also successfully bridged the gap between the `.pay(amount)` expectation and 
the `.sendPayment(currency, value)` reality, defaulting the currency cleanly to 'USD'.

This pattern is used constantly in the real world when dealing with 3rd-party 
libraries, legacy codebases, and migrating to new databases or services.

**Status:** ✅ Completed! 
================================================================================
*/
