

class Command {

    execute() {

    }
    undo() {

    }
}

class Light {
    on() {
        console.log("Light ON");
    }
    off() {
        console.log("Light OFF");
    }
}

class Fan {
    on() {
        console.log("Fan ON");
    }
    off() {
        console.log("Fan OFF");
    }
}

class LightCommand extends Command {
    constructor(light) {
        super();
        this.light = light;
    }
    execute() {
        this.light.on();
    }
    undo() {
        this.light.off();
    }
}

class FanCommand extends Command {
    constructor(fan) {
        super()
        this.fan = fan;
    }
    execute() {
        this.fan.on();
    }
    undo() {
        this.fan.off();
    }
}

class MacroCommand extends Command {
    constructor(commands) {
        super();
        this.commands = commands;
    }
    execute() {
        this.commands.forEach(cmd => cmd.execute());
    }
    undo() {
        // Must undo in reverse order!
        this.commands.slice().reverse().forEach(cmd => cmd.undo());
    }
}

class RemoteController {
    constructor() {
        this.numButton = 4;
        this.buttons = [];
        this.history = []; // The Undo Stack!
        
        for (let i = 0; i < this.numButton; i++) {
            this.buttons[i] = null;
        }
    }
    
    setCommand(index, cmd) {
        if (index >= 0 && index < this.numButton) {
            this.buttons[index] = cmd;
        }
    }
    
    pressButton(index) {
        if (index >= 0 && index < this.numButton && this.buttons[index] != null) {
            const cmd = this.buttons[index];
            cmd.execute();
            this.history.push(cmd); // Push to history stack after execution
        } else {
            console.log("No command assign to index ", index);
        }
    }

    pressUndoButton() {
        if (this.history.length > 0) {
            const lastCmd = this.history.pop();
            lastCmd.undo();
        } else {
            console.log("Nothing to undo!");
        }
    }
}

const light1 = new Light();
const fan1 = new Fan();

const lightCmd = new LightCommand(light1);
const fanCmd = new FanCommand(fan1);

// Create the Macro Command
const partyModeCmd = new MacroCommand([lightCmd, fanCmd]);

const remote = new RemoteController();

remote.setCommand(0, lightCmd);
remote.setCommand(1, fanCmd);
remote.setCommand(3, partyModeCmd);

console.log("--- Normal Usage ---");
remote.pressButton(0); // Light ON
remote.pressButton(1); // Fan ON

console.log("\n--- Global Undo ---");
remote.pressUndoButton(); // Undoes Fan (Fan OFF)
remote.pressUndoButton(); // Undoes Light (Light OFF)

console.log("\n--- Party Mode (Macro Command) ---");
remote.pressButton(3); // Light ON, Fan ON

console.log("\n--- Undo Party Mode ---");
remote.pressUndoButton(); // Fan OFF, Light OFF

/**
 * 🎙️ INTERROGATION - LLD REVIEWER
 * 
 * 1. The Undo Stack Trap: You implemented `undo` by tracking a boolean toggle (`this.buttonPressed`) 
 *    per button. What is the limitation of this approach? If a user presses Button 0, then Button 1, 
 *    how would you redesign the `RemoteController` to have a single "Global Undo" button that 
 *    undoes the last 5 commands in reverse order?
 * 
 * 2. Command vs Callback: In JavaScript, we can easily pass a function as a callback: 
 *    `remote.setCommand(0, () => light1.on())`. If JavaScript supports first-class functions 
 *    and closures, why do we need to build full `Command` classes like `LightCommand`? 
 *    When does the object-oriented Command pattern become strictly necessary over simple callbacks?
 * 
 * 3. Macro Commands: How would you implement a "Party Mode" button that turns on the Fan 
 *    AND the Lights simultaneously using the Command pattern, WITHOUT modifying the `RemoteController` 
 *    or the Receiver classes?
 * 
 * --- VIVEK'S ANSWERS ---
 * 1. there is limitations in my current implementation of undo functionality, to implement global 
 *    undo we can use a stack data structure to impplement this undo functionality
 * 2. this is simple so in this case it work but in realworld scenarios callback are not enough 
 *    to implement this functionality it can be a complex logic and implementaion and It if we are
 *    using class then we can make one single class where we can have all type of like on, off, change 
 *    temparture, timers etc which is not possible in callback  and callback will break the DRY principle
 *    and It will be hard to maintain the code
 * 3. we can implement party button by addine a one more if condition in pressButton method
 *         else if (index == 3) {
 *             this.pressButton(0);
 *             this.pressButton(1);
 *         }
 * 
 * --- AI EVALUATION ---
 * 1. RIGHT: Spot on. You need a `stack` (array) in the RemoteController. Every time a command executes, you push it to the stack: `this.history.push(cmd)`. When the user presses "Undo", you pop the last command and call `cmd.undo()`.
 * 2. PARTIALLY RIGHT: You mentioned complex logic and grouping, which is true. But the MOST important reason we use a Command object instead of a callback `() => light.on()` is because of the `undo()` requirement and STATE. A simple callback cannot undo itself, nor can it remember the "previous temperature" if it was changing a thermostat.
 * 3. WRONG: You failed the constraint! I specifically asked how to do it WITHOUT modifying the `RemoteController`. Your solution hardcodes `index == 3` into the Invoker, violating the Open/Closed Principle. The correct design pattern way is to create a `MacroCommand` class:
 *    ```javascript
 *    class MacroCommand extends Command {
 *        constructor(commands) { super(); this.commands = commands; }
 *        execute() { this.commands.forEach(c => c.execute()); }
 *        undo() { this.commands.slice().reverse().forEach(c => c.undo()); }
 *    }
 *    // Client usage (NO changes to RemoteController needed!):
 *    remote.setCommand(3, new MacroCommand([new LightCommand(light1), new FanCommand(fan1)]));
 *    ```
 */
