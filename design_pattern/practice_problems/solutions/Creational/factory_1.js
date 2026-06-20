/**
 **factory_1** (Factory Method): Implement a `LogisticsApp`. Use a Factory Method to 
 handle the creation of `Truck` (Road) and `Ship` (Sea) transport. Ensure you 
 can add `Airplane` (Air) transport later without touching the main logic.
 */


class Transport {
    deliver() {
        throw new Error("Should be implemented")
    }
}

class Truck extends Transport {
    deliver() {
        console.log("LogisticsVehicle is Truck");
    }
}

class Airplane extends Transport {
    deliver() {
        console.log("LogisticsVehicle is Airplane")
    }
}
class Ship extends Transport {
    deliver() {
        console.log("LogisticsVehicle is ship")
    }
}

class LogisticsApp {
    createTransport(vehicle) {
        throw new Error("Should be Implemented");
    }
}

class RoadLogistics extends LogisticsApp {
    createTransport(vehicle) {
        if (vehicle.toLowerCase() == 'truck') {
            return new Truck();
        }
    }
}
class SeaLogistics extends LogisticsApp {
    createTransport(vehicle) {
        if (vehicle.toLowerCase() == 'ship') {
            return new Ship();
        }
    }
}

const logisticByRoad = new RoadLogistics().createTransport('truck');
logisticByRoad.deliver();

const logisticByWater = new SeaLogistics().createTransport('ship');
logisticByWater.deliver();


/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================

### 🚨 Code Issues & Concept Check
My apologies, the previous feedback failed to append! 

You have implemented a mix of a Simple Factory and an Abstract Factory, but this is NOT the **Factory Method Pattern**. Your current design heavily violates the **Open-Closed Principle**. If we want to add `SpaceLogistics` tomorrow, you have to modify `LogisticsApp` and `LogisticFactory` to add `selectBySpace()`.

In the **Factory Method Pattern**, the base Creator (`LogisticsApp`) should only have ONE abstract factory method (e.g., `createTransport()`), and the subclasses decide what specific transport to return.

**The structure should look like this:**
1. **Products:** `Transport` (base), extended by `Truck` and `Ship`.
2. **Creator:** `LogisticsApp` (base) with a method `planDelivery()` that calls `this.createTransport().deliver()`.
3. **Concrete Creators:** `RoadLogistics` and `SeaLogistics`. They extend `LogisticsApp` and override `createTransport()` to return a `new Truck()` or `new Ship()`.

By doing this, the client just does `new RoadLogistics().planDelivery()` without ever passing strings like `'truck'`.

### 🧠 Deep Dive Questions
1. **Cross-Pattern Context (OCP):** If you refactor this to the true Factory Method pattern as described above, how exactly does it satisfy the **Open-Closed Principle** if we want to add `AirLogistics` and `Airplane` later? Which existing classes would you need to modify?

**Next Steps:** Refactor the code to properly separate Creators and Products using the hints above, drop your answer below, and let me know when you're ready for a re-review!
================================================================================
1. after changes if we want to AirLogistics new class then first we need to extends the logsticeApp class
   we are not modify any class so no OCP voaltion here and then fro Airplace we need to extends the 
   transpost class which is alos no voliaions of OCP then we can create factory methods easily for 
   air transport and here i used only single factory method

--------------------------------------------------------------------------------
🏆 FINAL EVALUATION
--------------------------------------------------------------------------------
**Rating:** ⭐⭐⭐⭐ (4/5)

**Code Review:** Great refactor! You successfully separated the `Transport` product 
hierarchy from the `LogisticsApp` creator hierarchy. This is the core of the 
Factory Method pattern! 
*Minor tip:* In a true Factory Method, you usually don't even need to pass the 
`'truck'` string into `createTransport()`. Because `RoadLogistics` 
exists *specifically* to create road vehicles, it can just return `new Truck()` directly!

**Q1 (OCP):** Perfect answer! You correctly identified that adding Air Logistics means 
creating a new `AirLogistics` class extending `LogisticsApp`, and an `Airplane` 
class extending `Transport`. Zero existing code is modified, satisfying the 
Open-Closed Principle completely!

**Status:** ✅ Completed! 
================================================================================
*/
