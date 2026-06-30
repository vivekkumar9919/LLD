/**
 **prototype_1** (Invoice Cloning): Deep vs Shallow Copy
 
 ### The Scenario (Interview Style)
 You are building a subscription billing system. Every month, the system needs to 
 take last month's `Invoice`, duplicate it, update the date, and potentially add or 
 remove specific `lineItems` (e.g., adding a $5 "Late Fee").

 A junior developer tried to implement the cloning like this:
 ```javascript
 const oldInvoice = new Invoice("Alice", ["Hosting", "Domain"]);
 
 // Junior dev's clone attempt
 const newInvoice = new Invoice(oldInvoice.customerName, oldInvoice.lineItems);
 newInvoice.lineItems.push("Late Fee"); // BUG: This modifies the old invoice too!
 ```
 Because arrays are reference types in JavaScript, pushing to the new invoice's 
 array accidentally modifies the historical old invoice!

 ### Your Task
 Implement the `Invoice` class using the **Prototype Pattern**. 
 Give it a `.clone()` method that performs a **Deep Clone** of the object. 
 You must prove that modifying the `lineItems` array on the cloned invoice has 
 absolutely zero effect on the original invoice.

 *(Hint: You can use `structuredClone`, `JSON.parse(JSON.stringify())`, or manual 
 array mapping. Show me your preferred approach!)*
 */

class Invoice {
    constructor(customerName, lineItem) {
        this.customerName = customerName;
        this.lineItem = lineItem;
    }
    clone() {
        return new Invoice(structuredClone(this.customerName), structuredClone(this.lineItem));
    }
}

const invoice = new Invoice("vivek", { address: "varanasi", charges: 100 });
const copy1 = invoice.clone();
const copy2 = invoice.clone();
copy2.latefees = 200;
copy2.customerName = "akhil";
copy2.lineItem.charges = 5000;
console.log("copy-1 ", copy1);
console.log("copy-2 ", copy2);

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================
**Rating:** ⭐⭐ (2/5)

### 🚨 Code Issues & Concept Check
You successfully created a `.clone()` method, but you fell for the trap! You wrote 
the exact same code that the junior developer wrote in the scenario 
description: a **Shallow Clone**.

Look at this line:
`return new Invoice(this.customerName, this.lineItem);`

Because `this.lineItem` is an object, passing it directly into the new 
constructor just passes the **memory reference**. 

In your test case, you didn't mutate the nested object, you just added a 
new property to the root (`copy2.latefees = 200;`), which hid the bug from you. 
If you were to add this line to your test:
`copy2.lineItem.charges = 5000;`
You would find that `copy1` and `invoice` both instantly have their charges mutated 
to 5000 as well!

### 🧠 Next Steps
Fix your `.clone()` method so it performs a **Deep Clone**. You need to completely 
sever the memory reference of `this.lineItem`.
Try using `structuredClone(this.lineItem)` or `JSON.parse(JSON.stringify(this.lineItem))` 
inside your `.clone()` method. 

Update your test case to mutate `copy2.lineItem.charges` to prove that the original invoice is safe, and ping me for a re-review!
================================================================================
*/

/*
--------------------------------------------------------------------------------
🏆 FINAL EVALUATION (Iteration 2)
--------------------------------------------------------------------------------
**Rating:** ⭐⭐⭐⭐⭐ (5/5)

**Code Review:** Great job! By wrapping `this.lineItem` in `structuredClone()`, 
you completely severed the memory reference and created a true **Deep Clone**.
 Now, when your test modifies `copy2.lineItem.charges = 5000`, 
 the original invoice remains perfectly safe at 100! 

*(Small note: Since `this.customerName` is just a primitive string, 
you don't actually need to `structuredClone` it; strings are always copied by 
value in JavaScript. But it's totally harmless!)*

**Status:** ✅ Completed! 
================================================================================
*/