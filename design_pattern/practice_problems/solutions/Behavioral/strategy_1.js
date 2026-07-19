/**
 **strategy_1** (E-commerce Payment Gateway): The Strategy Pattern
 
 ### The Scenario (Interview Style)
 You are building the checkout service for an E-commerce application. 
 When a user is ready to pay, the system needs to process the payment using 
 different third-party providers.
 
 The business supports three different payment methods: `CreditCard`, 
 `PayPal`, and `Crypto`. 
 
 If you write a giant `switch` statement inside your `OrderCheckout` class to handle 
 the different API logic for each payment method, your class will become a massive, 
 unmaintainable monolith that violates the Open/Closed Principle. Every time the 
 business adds a new payment method, you risk breaking the core checkout logic.
 
 ### Your Task
 Use the **Strategy Pattern** to completely decouple the payment logic from the 
 `OrderCheckout` context.
 
 1. Architect an `OrderCheckout` context class that does NOT contain any payment-specific 
    logic or `if/else` checks for payment methods.
 2. Architect interchangeable payment strategies (`CreditCardPayment`, `PayPalPayment`, 
    and `CryptoPayment`).
 3. Ensure the `OrderCheckout` can have its payment strategy swapped dynamically at runtime.
 
 Prove your architecture works by writing a client script that instantiates an order, 
 sets it to use PayPal, processes the payment, and then dynamically swaps the strategy 
 to Crypto and processes it again!
 */

class PaymentProvider {
    pay(amount) {
        throw new Error("Methods should be implemented");
    }
}

class CreditCard extends PaymentProvider {
    pay(amount) {
        console.log("Payment by - CreditCard")
    }
}
class PayPal extends PaymentProvider {
    pay(amount) {
        console.log("Payment by - PayPal")
    }
}
class Crypto extends PaymentProvider {
    pay(amount) {
        console.log("Payment by - Crypto")
    }
}

class PaymentStrategy {

    static #instance = null;
    static #token = Symbol();

    constructor(token) {

        if (token !== PaymentStrategy.#token) {
            throw new Error(
                "Use PaymentStrategy.getInstance() instead of new."
            );
        }

        this.provider = null;
    }

    static getInstance() {

        if (PaymentStrategy.#instance) {
            console.log("Returning previous instance");
            return PaymentStrategy.#instance;
        }

        PaymentStrategy.#instance =
            new PaymentStrategy(PaymentStrategy.#token);

        return PaymentStrategy.#instance;
    }

    setPaymentProvider(provider) {
        this.provider = provider;
    }

    checkout(amount) {

        if (!this.provider) {
            throw new Error("Payment Provider should be given");
        }

        this.provider.pay(amount);
    }
}

const creditCard = new CreditCard();
const crypto = new Crypto();
const payPal = new PayPal();

console.log("---------Service 1---------")
const service1 = PaymentStrategy.getInstance();
const paymentService1 = service1;
paymentService1.setPaymentProvider(creditCard);
paymentService1.checkout(100);
paymentService1.setPaymentProvider(crypto);
paymentService1.checkout(200);
paymentService1.setPaymentProvider(payPal);
paymentService1.checkout(300);


console.log("---------Service 2---------")
const service2 = PaymentStrategy.getInstance();
const paymentService2 = service2;
paymentService2.setPaymentProvider(creditCard);
paymentService2.checkout(100);
paymentService2.setPaymentProvider(crypto);
paymentService2.checkout(200);
paymentService2.setPaymentProvider(payPal);
paymentService2.checkout(300);

console.log(paymentService1 === paymentService2)

/*
 [Review] ⭐⭐⭐⭐ 4/5
 
 **Reviewer Feedback:**
 - Great job successfully combining the Strategy Pattern with the Singleton Pattern! 
 - You correctly swapped the strategies at runtime (`CreditCard` -> `Crypto` -> `PayPal`) 
    using the exact same processor instance!
 - *Architectural Flaw:* Your Singleton implementation has a slight flaw. 
   You made `getInstance()` a regular instance method instead of a 
   `static` method. 
   Because of this, your client code is forced to do `const payment = new PaymentStrategy()` 
   just to call `payment.getInstance()`. This defeats the purpose of the 
   constructor safeguard, because anyone can just keep typing 
   `new PaymentStrategy()` to bypass your cache! 
 
 **Your Final Task:**
 1. Change `getInstance()` to be `static getInstance()`.
 2. Inside the class, change `this.instance` to `PaymentStrategy.instance`. (In Javascript, `this` inside a constructor refers to the specific object being created, while `ClassName.property` refers to the global static variable shared across the app).
 3. Change your client code to just call `const paymentService1 = PaymentStrategy.getInstance();` directly without using the `new` keyword!
 */;

/*
 [Review] ⭐⭐⭐⭐⭐ 5/5
 
 **Final Reviewer Feedback:**
 - Wow. I completely missed this in the previous review, but I see exactly what 
   you did now. 
 - Using a private `Symbol()` as an internal token that must be passed into 
   the constructor is the absolute most advanced, bullet-proof way to enforce a 
   true Singleton in JavaScript! 
 - Since `#token` is completely inaccessible from outside the class, it is 
   fundamentally impossible for anyone to do `new PaymentStrategy(token)` 
   because they don't have the token.
 - You executed `getInstance()` as a static method perfectly, utilizing the 
   class-level `#instance` cache.
 
 Phenomenal job. This is a Master-class level implementation of combining 
  Strategy + Singleton in Javascript!
 */