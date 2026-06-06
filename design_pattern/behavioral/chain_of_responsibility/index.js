

class MoneyHandler {

    constructor() {
        this.nextHandler = null;
    }
    setNextHandler(handler) {
        this.nextHandler = handler;
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
        let notesNeeded = Math.floor(amount / 1000);
        if (notesNeeded > this.noOfNotes) {
            notesNeeded = this.noOfNotes;
            this.noOfNotes = 0;
        }
        else {
            this.noOfNotes -= notesNeeded;
        }
        if(notesNeeded > 0 ){
            console.log("Dispensing "+ notesNeeded + " x 1000 " +" \n");
        }
        let remainingAmount = amount - notesNeeded*1000;
        if(remainingAmount > 0 ){
            if(this.nextHandler != null) this.nextHandler.dispense(remainingAmount);
            else {
                console.log("Remaining amount can not be fulfilled", remainingAmount);
            }
        }


    }

}

class FiveHundredHandler extends MoneyHandler {
    constructor(noOfNotes) {
         super();
        this.noOfNotes = noOfNotes;
    }
    dispense(amount) {
        let notesNeeded = Math.floor(amount / 500);
        if (notesNeeded > this.noOfNotes) {
            notesNeeded = this.noOfNotes;
            this.noOfNotes = 0;
        }
        else {
            this.noOfNotes -= notesNeeded;
        }
        if(notesNeeded > 0 ){
            console.log("Dispensing "+ notesNeeded + " x 500 " +" \n");
        }
        let remainingAmount = amount - notesNeeded*500;
        if(remainingAmount > 0 ){
            if(this.nextHandler != null) this.nextHandler.dispense(remainingAmount);
            else {
                console.log("Remaining amount can not be fulfilled", remainingAmount);
            }
        }


    }

}

class TwoHundredHandler extends MoneyHandler {
    constructor(noOfNotes) {
         super();
        this.noOfNotes = noOfNotes;
    }
    dispense(amount) {
        let notesNeeded = Math.floor(amount / 200);
        if (notesNeeded > this.noOfNotes) {
            notesNeeded = this.noOfNotes;
            this.noOfNotes = 0;
        }
        else {
            this.noOfNotes -= notesNeeded;
        }
        if(notesNeeded > 0 ){
            console.log("Dispensing "+ notesNeeded + " x 200 " +" \n");
        }
        let remainingAmount = amount - notesNeeded*200;
        if(remainingAmount > 0 ){
            if(this.nextHandler != null) this.nextHandler.dispense(remainingAmount);
            else {
                console.log("Remaining amount can not be fulfilled", remainingAmount);
            }
        }


    }

}

const thousandHandler = new ThousandHandler(1)
const fiveHundredHandler = new FiveHundredHandler(1);
const twoHundredHandler = new TwoHundredHandler(1);

// setting a chain of responsibility 
thousandHandler.setNextHandler(fiveHundredHandler);
fiveHundredHandler.setNextHandler(twoHundredHandler)

const amountToWithdraw = 8000

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
 * 
 */