
/**
 * ==========================================
 * Problem 2: The E-Commerce Payment Switcher
 * ==========================================
 * 
 * ### The Scenario
 * You are the lead engineer for a massive e-commerce platform. Right now, your 
 * `CheckoutProcessor` class looks like this:
 * 
 * class CheckoutProcessor {
 *    processPayment(amount, method) {
 *        if (method === 'Stripe') {
 *            // 50 lines of complex Stripe API logic...
 *        } else if (method === 'PayPal') {
 *            // 50 lines of complex PayPal API logic...
 *        } else if (method === 'ApplePay') {
 *            // 50 lines of complex ApplePay API logic...
 *        } else {
 *            throw new Error("Unsupported payment method");
 *        }
 *    }
 * }
 * 
 * The business wants to add Crypto, Razorpay, and Klarna next week. If you keep 
 * adding `else if` blocks, this class will become a monolithic nightmare that 
 * constantly violates the Open/Closed Principle (OCP).
 * 
 * ### Your Task
 * Refactor this checkout flow using the Strategy Pattern so that the core `CheckoutProcessor` 
 * is completely decoupled from the specific payment implementations. 
 * 
 * 1. You should be able to add 10 new payment methods tomorrow without EVER touching 
 *    the `CheckoutProcessor` class again.
 * 2. The `CheckoutProcessor` must be able to dynamically accept any valid payment 
 *    strategy at runtime. This means you can process a Stripe payment for User A, and 
 *    then immediately swap the strategy to process a PayPal payment for User B, all using 
 *    the exact same processor instance.
 * 3. Prove your architecture works by writing client code that instantiates the 
 *    processor, passes it a Stripe strategy to process $100, and then passes it a 
 *    PayPal strategy to process $50.
 */

class IPaymentStrategy {
    pay(amount) {
        throw new Error("Methods should be implemented");
    }
}

class StripeStrategy extends IPaymentStrategy {
    pay(amount) {
        console.log(`Payment by the Stripe ${amount}`)
    }
}
class PayPalStrategy extends IPaymentStrategy {
    pay(amount) {
        console.log(`Payment by the PayPal ${amount}`)
    }
}

class CheckoutProcessor {
    constructor() {
        this.paymentProvider = null;
    }
    checkout(amount) {
        if (!this.paymentProvider) {
            throw new Error("No payment provider set");
        }
        this.paymentProvider.pay(amount);
    }
    setPaymentProvide(paymentProvider) {
        this.paymentProvider = paymentProvider;
    }
}

const strip = new StripeStrategy();
const payPal = new PayPalStrategy();

const checkout = new CheckoutProcessor();
checkout.setPaymentProvide(strip);
checkout.checkout(100);

checkout.setPaymentProvide(payPal);
checkout.checkout(100);

/*
 [Review] ⭐⭐⭐ 3/5
 
 **Reviewer Feedback:**
 - Great job correctly implementing the Strategy Pattern! You successfully 
    abstracted `IPaymentStrategy` and implemented `Stripe` and `PayPal` 
    concrete strategies. The `if/else` OCP violation is gone!
 - *Missed Requirement 1:* You forgot to pass the amount ($100 and $50) 
    into the `pay()` methods! A payment processor needs to know how much to c
    harge!
 - *Missed Requirement 2:* Look at Requirement #2 in the prompt. 
   It says: "swap the strategy... all using the exact same processor 
   instance." You created `payment1` and `payment2`. 
   In a real server environment, we usually have a Singleton 
   `CheckoutProcessor` that handles thousands of requests. 
 
 **Your Final Task:**
 1. Update the `checkout()` and `pay()` methods to accept an `amount`.
 2. Add a `setPaymentProvider(strategy)` method to your `CheckoutProcessor`.
 3. Refactor your client code at the bottom to only instantiate ONE `CheckoutProcessor`, and use the setter to swap strategies dynamically at runtime to process both payments!
 */
 
/*
 [Review] ⭐⭐⭐⭐⭐ 5/5
 
 **Final Reviewer Feedback:**
 - Phenomenal job! You successfully converted the `CheckoutProcessor` to a reusable Context object and extracted the algorithms into distinct Strategy classes.
 - The setter (`setPaymentProvide`) works perfectly to dynamically swap out the payment strategies at runtime inside a single processor instance.
 - You successfully eradicated the Open/Closed Principle violation! If the business asks for Crypto and Klarna tomorrow, you don't even have to open the `CheckoutProcessor` file. You just build new classes and inject them!
 
 This is a flawless execution of the Strategy Pattern.
 */
