

class PowerSupply {

    providePower() {
        console.log("PowerSupply : Providing Power ....")
    }
}

class CoolingSystem {
    startFans() {
        console.log("CoolingSystem : Starting fans ...")
    }
}
class CPU {
    initialize() {
        console.log("CPU : Initializations started ...")
    }
}
class Memory {
    selfTest() {
        console.log("Memory : Memory added ...")
    }
}
class HardDrive {
    spinUp() {
        console.log("HardDrive : Spinning up ...")
    }
}
class BIOS {
    boot(cpu, memory) {
        console.log("BIOS : Booting ...")
        cpu.initialize();
        memory.selfTest();
        console.log("BIOS : Booting Done")
    }
}
class OperatingSystem {
    load() {
        console.log("OperatingSystem : Loading into memory ...")
    }
}

class ComputerFacade {

    constructor(powerSupply, coolingSystem, cpu, memory, hardDrive, bios, os) {
        this.powerSupply = powerSupply;
        this.coolingSystem = coolingSystem;
        this.cpu = cpu;
        this.memory = memory;
        this.hardDrive = hardDrive;
        this.bios = bios;
        this.os = os;
    }

    startComputer() {
        console.log("Starting Computer ...");
        this.powerSupply.providePower();
        this.coolingSystem.startFans();
        // Removed redundant cpu.initialize() and memory.selfTest()
        this.hardDrive.spinUp();
        this.bios.boot(this.cpu, this.memory); // BIOS handles cpu and memory
        this.os.load();
        console.log("Computer started ");
    }

}

const power = new PowerSupply();
const cooling = new CoolingSystem();
const cpu = new CPU();
const memory = new Memory();
const hd = new HardDrive();
const bios = new BIOS();
const os = new OperatingSystem();

const computer = new ComputerFacade(power, cooling, cpu, memory, hd, bios, os);
computer.startComputer();

/**
 * 🎙️ INTERROGATION - LLD REVIEWER
 * 
 * 1. The Duplication Bug: Look closely at your `startComputer` method and 
 *    the `BIOS.boot` method. What happens to the CPU and Memory when you 
 *    call `startComputer()`? In a real hardware system, what would be the 
 *    consequence of this logic error?
 * 
 * 2. Dependency Injection (DIP): Your `ComputerFacade` hardcodes the creation 
 *    of its subsystems (e.g., `new PowerSupply()`). If I want to test the 
 *    facade without actually spinning up a real HardDrive (which could take 
 *    minutes in a real system), how would I mock the HardDrive with your 
 *    current design? How should you refactor the constructor to fix this?
 * 
 * 3. The "God Object" Trap: Since a Facade connects
 *    to many subsystems, isn't it violating the Single Responsibility Principle (SRP) 
 *    by managing Power, Cooling, Memory, and Storage all at once? Doesn't 
 *    this make it a "God Object" that we should avoid?
 * 
 * --- VIVEK'S ANSWERS ---
 * 1. I am just try to implement a behavior of the class which may depends on 
 *    other class it will be not done in actula software design 
 * 2. We can mock the HardDrive by passing a mock HardDrive object to the 
 *    ComputerFacade constructor
 * 3. No This is not a voilations of SRP because ComputerFacade job is to start computer
 *    only and then implementions of cpu, memory , harddrive  etc are responsiblity of 
 *    cpu, memory , harddrive class respectively
 *    facade only provide a simplied interface to the complex system
 * 
 * 4. The DI Paradox (User Question): "In my previous method, clients were not aware 
 *    of the internal methods. But now we have made it tightly coupled here. If clients 
 *    now know all the methods and their dependencies, why not call them directly 
 *    instead of using the facade pattern?"
 *    
 *    AI Answer: You are 100% correct. If the *End Client* has to manually write 
 *    `new PowerSupply()`, etc., the Facade has failed its primary goal of hiding complexity.
 *    To get both Hidden Complexity AND Testability, we use a Factory (or IoC container).
 *    The Factory builds the Facade. The Client only talks to the Factory.
 *    `const myComputer = ComputerFactory.createStandardComputer();`
 *    This isolates the Client from complexity, while still allowing Unit Tests to 
 *    inject mocks directly into `new ComputerFacade(mockPower...)`.
 *    
 *    Solution 1: The Factory Pattern
 *    
     class ComputerFactory {
        static createStandardComputer() {
            // The factory handles all the messy instantiations
            return new ComputerFacade(new PowerSupply(), new CoolingSystem(), new CPU(), new Memory(), new HardDrive(), new BIOS(), new OperatingSystem());
        }
    }

    // 👑 The Client code is now beautiful and ignorant again:
    const myComputer = ComputerFactory.createStandardComputer();
    myComputer.startComputer();

 * Solution 2: Default Parameters (The JS Way)

 * class ComputerFacade {
    constructor(
        powerSupply = new PowerSupply(), 
        cooling = new CoolingSystem(),
        // ... etc
    ) {
        this.powerSupply = powerSupply;
        this.coolingSystem = cooling;
    }
  }

// 👑 The Client just does this:
const computer = new ComputerFacade(); // Uses defaults
computer.startComputer();

// 🧪 But the Unit Test does this:
const testComputer = new ComputerFacade(mockPower, mockCooling); 

 * 
 */
