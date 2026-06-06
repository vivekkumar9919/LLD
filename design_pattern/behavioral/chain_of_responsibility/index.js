

class MoneyHandler {
    constructor() {
        this.nextHandler = null;
    }
    
    setNextHandler(handler) {
        this.nextHandler = handler;
    }
    
    // Template Method for dispensing
    dispenseLogic(amount, noteValue) {
        let notesNeeded = Math.floor(amount / noteValue);
        
        if (notesNeeded > this.noOfNotes) {
            notesNeeded = this.noOfNotes;
            this.noOfNotes = 0;
        } else {
            this.noOfNotes -= notesNeeded;
        }
        
        if (notesNeeded > 0) {
            console.log("Dispensing " + notesNeeded + " x  " + noteValue + " \n");
        }
        
        let remainingAmount = amount - notesNeeded * noteValue;
        
        if (remainingAmount > 0) {
            if (this.nextHandler != null) {
                this.nextHandler.dispense(remainingAmount);
            } else {
                throw new Error("Transaction Failed: ATM cannot fulfill the remaining amount: " + remainingAmount);
            }
        }
    }
    
    dispense(amount) {
        throw new Error("dispense should be implemented")
    }
}

class ThousandHandler extends MoneyHandler {
    constructor(noOfNotes) {
        super();
        this.noOfNotes = noOfNotes;
    }
    dispense(amount) {
        this.dispenseLogic(amount, 1000);
    }
}

class FiveHundredHandler extends MoneyHandler {
    constructor(noOfNotes) {
        super();
        this.noOfNotes = noOfNotes;
    }
    dispense(amount) {
        this.dispenseLogic(amount, 500);
    }
}

class TwoHundredHandler extends MoneyHandler {
    constructor(noOfNotes) {
        super();
        this.noOfNotes = noOfNotes;
    }
    dispense(amount) {
        this.dispenseLogic(amount, 200);
    }
}

const thousandHandler = new ThousandHandler(1)
const fiveHundredHandler = new FiveHundredHandler(1);
const twoHundredHandler = new TwoHundredHandler(1);

// setting a chain of responsibility 
thousandHandler.setNextHandler(fiveHundredHandler);
fiveHundredHandler.setNextHandler(twoHundredHandler)

const amountToWithdraw = 1700

thousandHandler.dispense(amountToWithdraw);

console.log(Math.floor(2500 / 1000))

/**
 * 🎙️ INTERROGATION - LLD REVIEWER
 * 
 * 1. The DRY Violation: Look at your three handler classes. The `dispense()` logic is heavily 
 *    copy-pasted in all three, with only the denomination numbers (1000, 500, 200) changed. 
 *    How would you refactor this to completely eliminate the duplicated code while still 
 *    maintaining the Chain of Responsibility structure?
 * 
 * 2. Chain Breakage: What happens if a client forgets to call `setNextHandler` and just 
 *    runs `thousandHandler.dispense(2500)`? Is it safe to just `console.log` the failure 
 *    as you did, or should the chain throw an Error/Exception to the client? Why?
 * 
 * 3. Dynamic Chains: In your client code, the chain is hardcoded (`1000 -> 500 -> 200`). 
 *    How would you redesign the system if the ATM machine needed to dynamically change the 
 *    order of the chain based on which cassettes currently have the most notes?
 * 
 * --- VIVEK'S ANSWERS ---
 * 1. Fixed in code 
 * 2. we can not hardcode the next handlers because if any notes get removed then we need to change in code 
 *    which break the open closed principles so clients should set the nexthandlers , we can through error 
 *    if setNextHandler is not called because on console log system failed silently which can be a wrong 
 *    client should be aware about the error here 
 * 3. Yes we can do , we can create a class dynamicNextHandlers which first check the total notes count then based 
 *    on count it can call the setNextHandler in count order also check the amount 
 * 
 * --- AI EVALUATION ---
 * 1. PARTIALLY RIGHT: Your intent to abstract the logic was perfect, but your execution has a fatal JS bug!
 *    Because `dispenseHelper` is a standalone function, the `this` keyword inside it is undefined (or the global object). 
 *    Calling `this.noOfNotes` inside the helper will crash or behave unpredictably. 
 *    To fix this, you either need to call it with `dispenseHelper.call(this, amount, ...)` or, even better, 
 *    move that logic into the `MoneyHandler` base class so it acts as a Template Method. Alternatively, 
 *    you don't even need 3 separate classes; you just need one `DenominationHandler(noteValue, noOfNotes)` class!
 * 2. RIGHT: Exactly. Failing silently is dangerous. If the ATM can't fulfill the request, it MUST throw an Exception so the main system can catch it, 
 *    show an error to the user, and cancel the account debit!
 * 3. RIGHT: Spot on. The beauty of the CoR pattern is that the chain isn't permanent.
 *    An `ATMDispatcher` can dynamically query cassettes and wire up 
 *    `setNextHandler()` at runtime based on inventory.
 */