

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
 */
