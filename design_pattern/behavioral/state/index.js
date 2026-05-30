
class VendingState {

    insertCoin(machine, coin) {
        throw new Error("Methods should be implemented");
    }
    selectItem(machine) {
        throw new Error("Methods should be implemented");
    }
    dispense(machine) {
        throw new Error("Methods should be implemented");
    }
    returnCoin(machine) {
        throw new Error("Methods should be implemented");
    }
    refill(machine, qty) {
        throw new Error("Methods should be implemented");
    }
    getStateName() {
        throw new Error("Methods should be implemented");
    }
}

class VendingMachine {

    constructor(itemCount, itemPrice) {
        this.currentState = null;
        this.itemCount = itemCount;
        this.itemPrice = itemPrice;
        this.insertedCoins = 0;
        // state 
        this.noCoinState = new NoCoinState();
        this.hasCoinState = new HasCoinState();
        this.dispenseState = new DispenseState();
        this.soldOutState = new SoldOutState();
        if (itemCount > 0) {
            this.currentState = this.noCoinState;
        } else {
            this.currentState = this.soldOutState;
        }
    }

    getNoCoinState() {
        return this.noCoinState;
    }
    getHasCoinState() {
        return this.hasCoinState;
    }
    getDispenseState() {
        return this.dispenseState;
    }
    getSoldOutState() {
        return this.soldOutState;
    }

    // Data access methods
    getItemCount() {
        return this.itemCount;
    }
    decrementItemCount() {
        this.itemCount--;
    }
    incrementItemCount(count = 1) {
        this.itemCount += count;
    }
    getInsertedCoin() {
        return this.insertedCoins;
    }
    setInsertedCoin(coin) {
        this.insertedCoins = coin;
    }
    addCoin(coin) {
        this.insertedCoins += coin;
    }
    getPrice() {
        return this.itemPrice;
    }
    setPrice(itemPrice) {
        this.itemPrice = itemPrice;
    }

    _transitionTo(nextState) {
        if (!nextState || !(nextState instanceof VendingState)) {
            console.error(`Transition Error: Invalid next state received. Staying in current state (${this.currentState ? this.currentState.getStateName() : 'NULL'}).`);
            return;
        }
        this.currentState = nextState;
    }

    insertCoin(coin) {
        const nextState = this.currentState.insertCoin(this, coin);
        this._transitionTo(nextState);
    }

    selectItem() {
        const nextState = this.currentState.selectItem(this);
        this._transitionTo(nextState);
        if (this.currentState.getStateName() === "DISPENSING") {
            this.dispense();
        }
    }

    dispense() {
        const nextState = this.currentState.dispense(this);
        this._transitionTo(nextState);
    }

    returnCoin() {
        const nextState = this.currentState.returnCoin(this);
        this._transitionTo(nextState);
    }

    refill(quantity) {
        const nextState = this.currentState.refill(this, quantity);
        this._transitionTo(nextState);
    }

    printStatus() {
        console.log("\n--- Vending Machine Status ---");
        console.log("Items remaining:", this.itemCount);
        console.log("Inserted coin:", this.insertedCoins);
        console.log("Current state:", this.currentState.getStateName());
        console.log();
    }
}


class NoCoinState extends VendingState {
    insertCoin(machine, coin) {
        machine.setInsertedCoin(coin); // Rs 10
        console.log("Coin inserted. Current balance: Rs ", coin)
        return machine.getHasCoinState(); // Transition to HasCoinState
    }

    selectItem(machine) {
        console.log("Please insert coin first!")
        return machine.getNoCoinState(); // Stay in same state
    }

    dispense(machine) {
        console.log("Please insert coin and select item first!")
        return machine.getNoCoinState(); // Stay in same state
    }

    returnCoin(machine) {
        console.log("No coin to return!")
        return machine.getNoCoinState(); // Stay in same state
    }

    refill(machine, quantity) {
        console.log("Items refilling");
        machine.incrementItemCount(quantity);
        return machine.getNoCoinState(); // Stay in same state
    }

    getStateName() {
        return "NO_COIN";
    }

}

class HasCoinState extends VendingState {
    insertCoin(machine, coin) {
        machine.addCoin(coin); // Rs 10
        console.log("Coin add. Current balance: Rs ", machine.getInsertedCoin())
        return machine.getHasCoinState(); // Transition to HasCoinState
    }
    selectItem(machine) {

        if (machine.getInsertedCoin() >= machine.getPrice()) {

            console.log("Item selected. Dispensing...");

            const change =
                machine.getInsertedCoin() - machine.getPrice();

            if (change > 0) {
                console.log("Change returned: Rs", change);
            }

            machine.setInsertedCoin(0);

            return machine.getDispenseState();
        }

        const needed =
            machine.getPrice() - machine.getInsertedCoin();

        console.log(
            "Insufficient funds. Need Rs",
            needed,
            "more"
        );

        return machine.getHasCoinState();
    }

    dispense(machine) {
        console.log("Please select an item first!");
        return machine.getHasCoinState();
    }

    returnCoin(machine) {

        console.log(
            "Coin returned: Rs",
            machine.getInsertedCoin()
        );

        machine.setInsertedCoin(0);

        return machine.getNoCoinState();
    }

    refill(machine, quantity) {

        console.log("Can't refill in this state");

        return machine.getHasCoinState();
    }

    getStateName() {
        return "HAS_COIN";
    }
}

class DispenseState extends VendingState {

    insertCoin(machine, coin) {

        console.log(
            "Please wait, already dispensing item. Coin returned: Rs",
            coin
        );

        return machine.getDispenseState();
    }

    selectItem(machine) {

        console.log(
            "Already dispensing item. Please wait."
        );

        return machine.getDispenseState();
    }

    dispense(machine) {

        console.log("Item dispensed!");

        machine.decrementItemCount();

        if (machine.getItemCount() > 0) {
            return machine.getNoCoinState();
        }

        console.log("Machine is now sold out!");

        return machine.getSoldOutState();
    }

    returnCoin(machine) {

        console.log(
            "Cannot return coin while dispensing item!"
        );

        return machine.getDispenseState();
    }

    refill(machine, quantity) {

        console.log("Can't refill in this state");

        return machine.getDispenseState();
    }

    getStateName() {
        return "DISPENSING";
    }
}

class SoldOutState extends VendingState {

    insertCoin(machine, coin) {

        console.log(
            "Machine is sold out. Coin returned: Rs",
            coin
        );

        return machine.getSoldOutState();
    }

    selectItem(machine) {

        console.log("Machine is sold out!");

        return machine.getSoldOutState();
    }

    dispense(machine) {

        console.log("Machine is sold out!");

        return machine.getSoldOutState();
    }

    returnCoin(machine) {

        console.log(
            "Machine is sold out. No coin inserted."
        );

        return machine.getSoldOutState();
    }

    refill(machine, quantity) {

        console.log("Items refilling");

        machine.incrementItemCount(quantity);

        return machine.getNoCoinState();
    }

    getStateName() {
        return "SOLD_OUT";
    }
}

const machine = new VendingMachine(2, 20);

machine.printStatus();

machine.selectItem();

machine.insertCoin(100);

machine.selectItem(); // Auto-dispenses and transitions back to NO_COIN

machine.printStatus();

machine.insertCoin(20);

machine.selectItem(); // Auto-dispenses and transitions to SOLD_OUT

machine.printStatus();

machine.insertCoin(5);

machine.refill(2);

machine.printStatus();

/*
=========================================
INTERROGATION QUESTIONS (State Pattern LLD)
=========================================
1. DispenseState Deletion (Interviewer critique):
   Currently, the client code must manually call `machine.dispense()` to finalize 
   the checkout and dispense the item after selecting it. 
   Since dispensing is just a console log and decrementing `itemCount`, wouldn't 
   it be simpler to delete the `DispenseState` class entirely, execute this dispensing 
   logic directly inside `HasCoinState.selectItem()`, and transition directly back to 
   `NoCoinState` (or `SoldOutState`)? Defend the architectural existence of 
   `DispenseState`.

2. Encapsulation Leak & Auto-Transition:
   Forcing the client to manually invoke `machine.dispense()` violates encapsulation—in 
   the real world, a user selects an item, and the machine dispenses it automatically 
   without requiring a separate "dispense" command.
   - How would you refactor your `VendingMachine` and state design so that dispensing 
     happens automatically after a successful item selection, without exposing this 
     inner transition method to the client?
   - What happens to your state machine if one of the state methods forgets to return 
     a state (returns `undefined`)? How would you make this design more robust to 
     prevent runtime crashes from state return omissions?
*/