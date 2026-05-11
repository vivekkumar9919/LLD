/**
 * **solid_3** (LSP): Liskov Substitution Principle
 * 
 * 🛠️ THE SCENARIO:
 * Build a checkout system where every payment method can 'pay', but only some can 'refund'.
 * 
 * 📝 REQUIREMENTS:
 * 1. PaymentMethod (Base): Should define pay(amount) and refund(amount).
 * 2. WalletPayment (Sub): Supports both pay and refund.
 * 3. CryptoPayment (Sub): Supports pay, but CANNOT support refund (blockchain is immutable).
 * 
 * 🚨 THE CHALLENGE:
 * Design the classes so that a PaymentProcessor can call .refund() on ANY 
 * PaymentMethod without:
 * - Crashing the app.
 * - Using 'if (payment instanceof CryptoPayment)'.
 * - Breaking the expectation that a "PaymentMethod" is a single substitutable type.
 * 
 * 🎙️ INTERROGATOR HINT: 
 * If a subclass CANNOT fulfill the contract of the base class (like refunding), 
 * is it actually a proper "Subtype"? Or should the contract be redefined?
 */


// this is not write examples or way to do LSP

/** 

class PaymentMethod {
    pay(amount) {
        throw new Error("pay() method must be implemented");
    }
    refund(amount) {
        throw new Error("refund() method must be implemented");
    }
}

class WalletPayment extends PaymentMethod{
    pay(amount) {
        console.log("Payment done by WalletPayment", amount)
    }
    refund(amount) {
        console.log("Refund done by WalletPayment", amount)
    }
}

class CryptoPayment extends PaymentMethod {
    pay(amount) {
        console.log("Payment done by CryptoPayment", amount)
    }
    refund(amount) {
        throw new Error("CryptoPayment do not support refund")
    }
}

const walletPayment = new WalletPayment();

walletPayment.pay(100);
walletPayment.refund(200);

const cryptoPayment = new CryptoPayment();
cryptoPayment.pay(100);
cryptoPayment.refund(200);


*/


// Correct Way 

class PaymentMethod {
    pay(amount) {
        throw new Error("pay() method must be implemented");
    }
}

class RefundSupportedMethods extends PaymentMethod {
    refund(amount) {
        throw new Error("refund() method must be implemented");
    }
}

class WalletPayment extends RefundSupportedMethods {
    pay(amount) {
        console.log("Payment done by WalletPayment", amount)
    }
    refund(amount) {
        console.log("Refund done by WalletPayment", amount)
    }
}

class CryptoPayment extends PaymentMethod {
    pay(amount) {
        console.log("Payment done by CryptoPayment", amount)
    }
}

const walletPayment = new WalletPayment();

walletPayment.pay(100);
walletPayment.refund(200);

const cryptoPayment = new CryptoPayment();
cryptoPayment.pay(100);

/**
 * 🎙️ INTERROGATION - LLD REVIEWER
 * 
 * 1. The Array Loop Dilemma: If I have an array of PaymentMethod (which only 
 *    guarantees pay), how does your new design help me handle a batch refund? 
 *    Do I still need a "check" before calling refund?
 * 
 * 2. The "Boolean Flag" Trap: Why not just keep refund() in the base class 
 *    and add a property isRefundable: boolean? Then the client can check the 
 *    flag. Is that an LSP violation? Why or why not?
 * 
 * 3. The "No-Op" Strategy: What if we kept refund() in CryptoPayment but 
 *    just made it a "No-Op" (empty function) that does nothing? Would that 
 *    be a better LSP implementation than your current one?
 * 
 * --- VIVEK'S ANSWERS ---
 * 1. yes its solve the batch processing dillema. we have to client must know about that 
 * which payment method support refund and which not so it can create a two list one 
 * for refund supporting method and other for non-refund supporting method  
 * 2. yes its LSP violation because it violate the LSP principle
 * 3. No , we are forcing  a method to client which it dosent support 
 * 
 * --- Ai Answer ---
 * . The "Two Lists" Strategy (Point #1)
This is actually a very mature answer. In a type-safe system, we would have a List<Refundable> and a List<Payment>. 
By separating the collections, you prevent the need for if checks at runtime. 
You’ve moved the logic from Runtime (dangerous) to Design time (safe).

2. The "Boolean Flag" Explanation (Point #2)
Why is a boolean flag an LSP violation?
The Reason: If a caller has to check if (payment.isRefundable), 
they are writing Special Case Logic. 
The whole point of LSP is that a caller should be able to treat 
all subclasses identically. If I have to check a flag, 
I am acknowledging that the objects are not interchangeable.

3. The "No-Op" Danger (Point #3)
You nailed this. A "No-Op" is a silent failure. If a user clicks 
"Refund" and the system does a no-op, the user thinks they got their 
money back, but they didn't. This violates the Contractual Expectation 
of the base class.
 */
