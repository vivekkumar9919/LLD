/**
 **factory_4** (Simple Factory): Refactor an e-commerce `DiscountCalculator` that 
 uses a messy `switch` statement for 'BLACK_FRIDAY', 'CHRISTMAS', and 'HOLI' into a 
 clean Factory structure.
 */

class DiscountStrategy {

    calculateDiscount(amount) {
        // Discount value is 0
        const discount = 0;
        return amount
    }
}

class BlackFridayDiscount extends DiscountStrategy {
    calculateDiscount(amount) {
        // Discount value is 50%
        if (!amount) {
            throw new Error("Amount Should be passed");
        }
        const discount = 0.50;
        const disCountedAmount = amount * discount;
        return amount - disCountedAmount
    }
}
class HoliDiscount extends DiscountStrategy {
    calculateDiscount(amount) {
        // Discount value is 10%
        if (!amount) {
            throw new Error("Amount Should be passed");
        }
        const discount = 0.10;
        const disCountedAmount = amount * discount;
        return amount - disCountedAmount
    }
}
class ChristmasDiscount extends DiscountStrategy {
    calculateDiscount(amount) {
        // Discount value is 20%
        if (!amount) {
            throw new Error("Amount Should be passed");
        }
        const discount = 0.20;
        const disCountedAmount = amount * discount;
        return amount - disCountedAmount
    }
}

class DiscountFactory {
    getDiscount(type) {
        if (type == 'BLACK_FRIDAY') return new BlackFridayDiscount();
        else if (type == 'CHRISTMAS') return new ChristmasDiscount();
        else if (type == 'HOLI') return new HoliDiscount();
        else {
            throw new Error("Unknow Type");
        }
    }
}

// const discount1 = new DiscountFactory().getDiscount('BLACK_FRIDAY').calculateDiscount(100);
// console.log(discount1);
// const discount2 = new DiscountFactory().getDiscount('CHRISTMAS').calculateDiscount(100);
// console.log(discount2);
// const discount3 = new DiscountFactory().getDiscount('HOLI').calculateDiscount(100);
// console.log(discount3);

const factory = new DiscountFactory()
const discount1 = factory.getDiscount('BLACK_FRIDAY').calculateDiscount(100);
const discount2 = factory.getDiscount('CHRISTMAS').calculateDiscount(100);
const discount3 = factory.getDiscount('HOLI').calculateDiscount(100);
console.log(discount1, discount2, discount3);

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================
**Rating:** ⭐⭐⭐⭐ (4/5)

### 🚨 Code Issues & Concept Check
Great job pulling that messy logic out into a Simple Factory! Your business logic 
now only ever asks the factory for a strategy, which satisfies the 
Single Responsibility Principle.

I docked one star for two minor things:
1. **Math bug:** The prompt was `calculateTotal`. If my cart is $100 and 
Holi gives a 10% discount, my total should be $90. Your code returns `$10`! 
(You just need to do `amount - discountedAmount`).
2. **Static Factory:** In the Simple Factory pattern, the factory class rarely has 
state. Therefore, `getDiscount()` is usually a `static` method so you can just 
call `DiscountFactory.getDiscount('HOLI')` without constantly instantiating 
`new DiscountFactory()`. 

Otherwise, the structure is perfect!

### 🧠 Deep Dive Questions
1. **Cross-Pattern Context:** The Simple Factory still violates the Open-Closed 
Principle because you have to modify the `getDiscount` method every time a new 
holiday is added. How could you combine the Simple Factory with the 
**Registry Pattern** (using a Map or Object) so that new holidays can 
"register" themselves dynamically without you ever touching `DiscountFactory` again?

**Next Steps:** Fix the math bug, make the factory method static, drop your answer below, and ping me for a re-review to get your 5/5!
================================================================================
*/
