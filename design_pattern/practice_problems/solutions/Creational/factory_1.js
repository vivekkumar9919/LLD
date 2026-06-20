/**
 **factory_1** (Factory Method): Implement a `LogisticsApp`. Use a Factory Method to 
 handle the creation of `Truck` (Road) and `Ship` (Sea) transport. Ensure you 
 can add `Airplane` (Air) transport later without touching the main logic.
 */


class ByRoad {
    LogisticsVehicle() {
        throw new Error("Should be implemented")
    }
}

class ByAir {
    LogisticsVehicle() {
        throw new Error("Should be implemented")
    }
}

class ByWater {
    LogisticsVehicle() {
        throw new Error("Should be implemented")
    }
}

class Truck extends ByRoad {
    LogisticsVehicle() {
        console.log("LogisticsVehicle is Truck");
    }
}

class Airplane extends ByAir {
    LogisticsVehicle() {
        console.log("LogisticsVehicle is Airplane")
    }
}
class Ship extends ByWater {
    LogisticsVehicle() {
        console.log("LogisticsVehicle is ship")
    }
}

class LogisticsApp {
    selectByRoad(vehicle) {
        throw new Error("Should be Implemented");
    }
    selectByAir(vehicle) {
        throw new Error("Should be Implemented");
    }
    selectByWater(vehicle) {
        throw new Error("Should be Implemented");
    }

}

class LogisticFactory extends LogisticsApp {
    selectByRoad(vehicle){
        if(vehicle.toLowerCase() == 'truck'){
            return new Truck();
        }
    }
    selectByAir(vehicle){
        if(vehicle.toLowerCase() == 'airplane'){
            return new Airplane();
        }
    }
    selectByWater(vehicle){
        if(vehicle.toLowerCase() == 'ship'){
            return new Ship();
        }
    }
}

const logisticByRoad = new LogisticFactory().selectByRoad('truck');
logisticByRoad.LogisticsVehicle();

const logisticByAir = new LogisticFactory().selectByAir('airplane');
logisticByAir.LogisticsVehicle();

const logisticByWater = new LogisticFactory().selectByWater('ship');
logisticByWater.LogisticsVehicle();


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
*/
