

class Engine {
    start() {
        throw new Error("Start method should be implemented")
    }
}

class DieselEngine extends Engine {
    start() {
        console.log("Car start with Diesel Engine")
    }
}
class PetrolEngine extends Engine {
    start() {
        console.log("Car start with Petrol Engine")
    }
}
class ElectricEngine extends Engine {
    start() {
        console.log("Car start with Electricity Engine")
    }
}

class Car {
    constructor(engine) {
        this.engine = engine;
    }
    drive() {
        throw new Error("Start method should be implemented")
    }
}

class Sedan extends Car {
    constructor(engine) {
        super(engine)
    }
    drive() {
        this.engine.start();
        console.log("Driving a Sedan car ")
    }
}

class SUV extends Car {
    constructor(engine) {
        super(engine)
    }
    drive() {
        this.engine.start();
        console.log("Driving a SUV car ")
    }
}

const dieselEngine = new DieselEngine();
const electricEngine = new ElectricEngine();
const petrolEngine = new PetrolEngine();

const sedanDiesel = new Sedan(dieselEngine);
const sedanElectric = new Sedan(electricEngine);
const sedanPetrol = new Sedan(petrolEngine);

const suvElectric = new SUV(electricEngine);

sedanDiesel.drive();
sedanElectric.drive();
sedanPetrol.drive();

suvElectric.drive();

/**
 * 🎙️ INTERROGATION - LLD REVIEWER
 * 
 * 1. The Class Explosion Problem: Explain exactly *why* the Bridge pattern is necessary here 
 *    instead of just using standard inheritance. What would happen to the total number of classes 
 *    if we added `Truck`, `Motorcycle` and `HybridEngine`, `NuclearEngine` without using Bridge?
 * 
 * 2. The Super Call Bug: Look closely at your `Sedan` and `SUV` constructors. 
 *    You are calling `super()` and then setting `this.engine = engine`. Look at your base `Car` 
 *    class constructor. Why is your `super()` call sloppy OOP practice, and how should it be fixed?
 * 
 * 3. Bridge vs Strategy: Structurally, injecting an `Engine` into a `Car` looks 100% identical 
 *    to injecting a `PaymentStrategy` into a `Checkout` (which we did in SOLID). What is the 
 *    fundamental difference in *intent* between the Structural Bridge pattern and the 
 *    Behavioral Strategy pattern?
 * 
 * --- VIVEK'S ANSWERS ---
 * 1. If we do no use bridge pattern then it create a class explosion problem. lets suppose we have 
 *     n number of car and m number of engine then we have to create n * m classes. it grow 
 *    exponentially in current case using bridge its have only m+n classes 
 * 2. By calling super() with no arguments, JavaScript passes undefined to the base class, 
 *    setting this.engine = undefined. Then, on the next line, you overwrite it with 
 *    the actual engine. It works in JavaScript because JS is loose, but in a strict 
 *    language like Java or C++, this would either fail to compile or throw a Null 
 *    Pointer Exception.
 *    You should simply call super(engine) and remove this.engine = engine from the 
 *    subclass!   
 * 3. do not know because Behavioral Strategy pattern still not finished yet 
 * 
 * --- AI EVALUATION ---
 * 1. RIGHT: Spot on. You perfectly described the Cartesian Product problem (N * M classes). 
 *    Bridge flattens it to N + M.
 * 2. RIGHT: You understood the flaw. I have refactored the code above to 
 *    use `super(engine)` properly!
 * 3. MISSING: Fair enough! Here is the answer for your future reference:
 *    - Strategy (Behavioral) swaps out *algorithms* at runtime. 
 *      The context and the strategy are solving the SAME problem in different 
 *      ways (e.g., Sorting via BubbleSort vs QuickSort).
 *    - Bridge (Structural) decouples two *completely different entities* so they 
 *      can grow independently. A Car and an Engine are not the same thing 
 *      doing the same task; they are two different domain concepts structurally 
 *      linked together.
 */