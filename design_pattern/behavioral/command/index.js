

class Command {

    execute(){

    }
    undo(){

    }
}

class Light {
    on(){
        console.log("Light ON");
    }
    off(){
        console.log("Light OFF");
    }
}

class Fan {
    on(){
        console.log("Fan ON");
    }
    off(){
        console.log("Fan OFF");
    }
}

class LightCommand extends Command{
    constructor(light){
        super();
        this.light = light;
    }
    execute(){
        this.light.on();
    }
    undo(){
        this.light.off();
    }
}

class FanCommand  extends Command {
    constructor(fan){
        super()
        this.fan = fan;
    }
    execute(){
        this.fan.on();
    }
    undo(){
        this.fan.off();
    }
}

class RemoteController {
    constructor(){
        this.numButton = 4;
        this.buttons = [];
        this.buttonPressed = [];
        for(let i = 0;i<this.numButton;i++){
            this.buttons[i]  = null;
            this.buttonPressed[i] = false;
        }
    }
    setCommand(index, cmd){
        if(index >= 0 && index < this.numButton){
            if(this.buttons[index] != null){
                this.buttons[index] = null;
            }
            this.buttons[index] = cmd;
            this.buttonPressed[index] = false;
        }
    }
    pressButton(index){
        if(index >= 0 && index < this.numButton && this.buttons[index] != null){
            if(this.buttonPressed[index] == false){
                this.buttonPressed[index] = true;
                this.buttons[index].execute();
            }
            else {
                this.buttonPressed[index] = false;
                this.buttons[index].undo();
            }
        }
        else {
            console.log("No command assign to index ", index)
        }
    }


}

const light1 = new Light();
const fan1 =  new Fan();

const remote = new RemoteController();

remote.setCommand(0, new LightCommand(light1));
remote.setCommand(1, new FanCommand(fan1));

remote.pressButton(0);
remote.pressButton(1);
remote.pressButton(0);
remote.pressButton(1);

remote.pressButton(2);

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
 * 
 */
