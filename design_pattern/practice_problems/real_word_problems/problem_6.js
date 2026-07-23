/**
 * ==========================================
 * Problem 6: The Parking Lot System
 * ==========================================
 * 
 * ### The Scenario
 * You are the lead architect designing the software for a multi-story Parking Lot.
 * 
 * Core Requirements:
 * 1. The parking lot has multiple floors.
 * 2. There are different types of parking spots: Compact, Large, and Motorcycle.
 * 3. There are different types of vehicles: Car, Truck, and Motorcycle. 
 *    - A Motorcycle can park in any spot.
 *    - A Car can park in Compact or Large spots.
 *    - A Truck can ONLY park in a Large spot.
 * 4. Entry Terminals issue a parking ticket and assign a spot.
 * 5. Exit Terminals scan the ticket, calculate the fee based on time parked and vehicle type, and process payment.
 * 6. Display boards on each floor show the number of available spots.
 * 
 * ### Your Task
 * Architect the classes and relationships to support this system. 
 * 
 * Since this is a full Low-Level Design (LLD) question, you will need to apply 
 * SOLID principles and Design Patterns! For example:
 * - How do you calculate different pricing models? 
 * - How do you update the Display Boards efficiently when a spot is taken? 
 * - How do you assign a spot? (e.g., "Closest First" vs "Random")
 * 
 * Write the skeleton classes, and prove your architecture works by writing client 
 * code that allows a Car to enter, get a ticket, park in a valid spot, leave, and pay.
 */
// Large Spots Free: 0
// Compact Spots Free: 5
// Motorcycle Spots Free: 5


// vehicles class 
class Vehicle {

    getType() {
        throw new Error("Methods should be implemented");
    }
}

class Car extends Vehicle {
    getType() {
        return "CAR";
    }
}

class Motorcycle extends Vehicle {
    getType() {
        return "MOTORCYCLE";
    }
}

class Truck extends Vehicle {
    getType() {
        return "TRUCK";
    }
}

class VehicleFactory {
    createVehicle(type) {
        if (type == 'car') return new Car();
        else if (type == 'motorcycle') return new Motorcycle();
        else if (type == 'truck') return new Truck();
        else {
            throw new Error("Unknown type")
        }
    }
}


// price 

class Pricing {
    calculate() {
        throw new Error("Methods should be implemented");
    }
}

class HourlyPricing extends Pricing {
    constructor() {
        super();
        this.vehicle = new VehicleFactory();
        this.rates = {
            CAR: 100,
            MOTORCYCLE: 50,
            TRUCK: 500
        };
    }
    calculate(type, time) {
        const vehicleClass = this.vehicle.createVehicle(type);
        const charges = this.rates[vehicleClass.getType()] * time;
        // here we can use typed passed directly but i have created the methods to get type of vehicle so i have used that 
        console.log("Hourly calculations for the ", { type: vehicleClass.getType(), charges: charges, time: time });
    }
}

class PricingStrategy {
    constructor() {
        this.strategy = null;
    }
    setPricingStrategy(strategy) {
        this.strategy = strategy;
    }
    calculatePrice(type, time) {
        this.strategy.calculate(type, time);
    }
}

// ParkingSpot
class ParkingSpot {

    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.vehicle = null;
    }

    isAvailable() {
        return this.vehicle == null;
    }

    canPark(vehicle) {

        switch (vehicle.getType()) {

            case "MOTORCYCLE":
                return true;

            case "CAR":
                return this.type === "COMPACT" ||
                    this.type === "LARGE";

            case "TRUCK":
                return this.type === "LARGE";

            default:
                return false;
        }
    }

    assign(vehicle) {
        this.vehicle = vehicle;
        console.log(`${vehicle.getType()} parked at Spot ${this.id}`);
    }

    free() {
        console.log(`${this.vehicle.getType()} left Spot ${this.id}`);
        this.vehicle = null;
    }
}

class Floor {

    constructor(id) {
        this.id = id;
        this.spots = [];
    }

    addSpot(spot) {
        this.spots.push(spot);
    }

    getSpots() {
        return this.spots;
    }
}

class SpotAssignmentStrategy {

    getSpot(floor, vehicle) {
        throw new Error();
    }
}
class ClosestSpotStrategy extends SpotAssignmentStrategy {

    getSpot(floor, vehicle) {

        for (const spot of floor.getSpots()) {

            if (
                spot.isAvailable() &&
                spot.canPark(vehicle)
            ) {
                return spot;
            }
        }

        return null;
    }
}

class ParkingLot {

    constructor(strategy) {
        this.floors = [];
        this.strategy = strategy;
    }

    addFloor(floor) {
        this.floors.push(floor);
    }

    assignSpot(vehicle) {

        for (const floor of this.floors) {

            const spot =
                this.strategy.getSpot(floor, vehicle);

            if (spot) {
                spot.assign(vehicle);
                return spot;
            }
        }

        return null;
    }

    freeSpot(spot) {
        spot.free();
    }
}

class Ticket {

    constructor(vehicle, spot) {
        this.vehicle = vehicle;
        this.spot = spot;
        this.entryTime = new Date();
    }
}

class EntryTerminal {

    constructor(parkingLot) {
        this.parkingLot = parkingLot;
    }

    processEntry(vehicle) {

        const spot =
            this.parkingLot.assignSpot(vehicle);

        if (!spot) {
            console.log("Parking Full");
            return;
        }

        return new Ticket(vehicle, spot);
    }
}

class ExitTerminal {

    constructor(parkingLot, pricing) {
        this.parkingLot = parkingLot;
        this.pricing = pricing;
    }

    processExit(ticket, hours) {

        this.pricing.calculatePrice(
            ticket.vehicle.getType().toLowerCase(),
            hours
        );

        this.parkingLot.freeSpot(ticket.spot);
    }
}

const parkingLot = new ParkingLot(
    new ClosestSpotStrategy()
);

const floor1 = new Floor(1);

floor1.addSpot(new ParkingSpot(1, "COMPACT"));
floor1.addSpot(new ParkingSpot(2, "COMPACT"));
floor1.addSpot(new ParkingSpot(3, "LARGE"));
floor1.addSpot(new ParkingSpot(4, "MOTORCYCLE"));

parkingLot.addFloor(floor1);


const factory = new VehicleFactory();

const car = factory.createVehicle("car");

const entry = new EntryTerminal(parkingLot);

const ticket = entry.processEntry(car);

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK (FAANG Rubric)
================================================================================

**1. Requirement Gathering: ⭐⭐⭐⭐⭐ (5/5)**
You completely dominated this category today. You stopped to ask about pricing logic, payment timing, and most impressively, you caught the UX edge case regarding how the display board shows available spots versus physical hardware limits.

**2. Architecture & OOD: ⭐⭐⭐⭐ (4/5)**
You made excellent architectural choices (Strategy for pricing, Factory for vehicles). Your `SpotAssignmentStrategy` was completely decoupled. You missed out on the final star only because you skipped the Observer pattern for the display board in this MVP iteration.

**3. Execution & Code Quality: ⭐⭐⭐ (3/5)**
Your logic was completely sound and your code ran flawlessly! However, there was some slight clunkiness in execution. For example, in `HourlyPricing`, you instantiated a `new VehicleFactory()` inside the pricing logic just to recreate a dummy vehicle to look up a string key. In an interview, you want to keep domain models clean and pass exactly what you need. 

**4. Edge Cases & Extensibility: ⭐⭐⭐⭐⭐ (5/5)**
You successfully caught the hardest edge case of the problem (Motorcycles parking in Compact spots). Because you used the Strategy pattern for pricing, your system is infinitely extensible.

**Overall Decision: STRONG HIRE.**
*/