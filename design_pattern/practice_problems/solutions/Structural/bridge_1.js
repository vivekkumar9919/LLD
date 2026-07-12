/**
 **bridge_1** (Device & Remote): The Bridge Pattern
 
 ### The Scenario (Interview Style)
 You are building software for a Smart Home appliance ecosystem. 
 You manufacture different types of **Appliances** (like Televisions and Radios) 
 and different types of **Controllers** (like Basic Remotes and Advanced Remotes 
 with a mute feature).
 
 If you used standard inheritance, you would suffer from a Cartesian product class 
 explosion. You would have to write: `BasicRemoteTV`, `BasicRemoteRadio`, 
 `AdvancedRemoteTV`, `AdvancedRemoteRadio`. Every time you add a new appliance (like 
 `SmartSpeaker`), you have to create a new controller class for it!
 
 ### Your Task
 Use the **Bridge Pattern** to solve this Cartesian explosion. Architect a solution 
 where the "Controllers" and the "Appliances" are completely decoupled, allowing 
 both sides to scale independently.
 
 Prove your architecture works by writing a client script that instantiates a 
 Television, hands it to an Advanced Controller, and uses the controller to power it 
 on, change the volume, and mute it.
 */



class Appliances {
    constructor() {
        this.isTurnOn = false;
        this.volume = 0;
    }
    turnOn() {
        throw new Error("Methods should me implemented")
    }
    turnOff() {
        throw new Error("Methods should me implemented")
    }
    getVolume() {
        throw new Error("Methods should me implemented")
    }
    setVolume(amount) {
        throw new Error("Methods should me implemented")
    }
}

class Televisions extends Appliances {
    constructor() {
        super();
        this.isTurnOn = false;
        this.volume = 0;
    }
    turnOn() {
        if (this.isTurnOn) {
            console.log("Television is already On");
        }
        else {
            console.log("Turing On Television...");
            this.isTurnOn = true;
        }
    }
    turnOff() {
        if (!this.isTurnOn) {
            console.log("Television is already Of");
        }
        else {
            console.log("Turing Of Television...");
            this.isTurnOn = false;
        }

    }
    getVolume() {
        console.log("Current Volume of Television is ", this.volume);
    }
    setVolume(amount) {
        if (amount >= 0 && amount <= 100) {
            this.volume = amount;
            console.log("Volume of Television is set to ", this.volume);
        }
        else {
            console.log("Invalid volume")
        }

    }
}

class Radio extends Appliances {
    constructor() {
        super();
        this.isTurnOn = false;
        this.volume = 0;
    }
    turnOn() {
        if (this.isTurnOn) {
            console.log("Radio is already On");
        }
        else {
            console.log("Turing On Radio...");
            this.isTurnOn = true;
        }
    }
    turnOff() {
        if (!this.isTurnOn) {
            console.log("Radio is already Of");
        }
        else {
            console.log("Turing Of Radio...");
            this.isTurnOn = false;
        }

    }
    getVolume() {
        console.log("Current Volume of Radio is", this.volume);
    }
    setVolume(amount) {
        if (amount >= 0 && amount <= 100) {
            this.volume = amount;
            console.log("Volume of Radio is set to ", this.volume);
        }
        else {
            console.log("Invalid volume")
        }

    }

}

class Remote {
    constructor(appliances) {
        this.appliances = appliances;
    }
    onAppliances() {
        throw new Error("Methods should me implemented")
    }
    ofAppliances() {
        throw new Error("Methods should me implemented")
    }
    getVolumeAppliances() {
        throw new Error("Methods should me implemented")
    }
    setVolumeAppliances() {
        throw new Error("Methods should me implemented")
    }
}

class BasicRemote extends Remote {
    constructor(appliances) {
        this.appliances = appliances;
    }
    onAppliances() {
        this.appliances.turnOn();
    }
    ofAppliances() {
        this.appliances.turnOff();
    }
    getVolumeAppliances() {
        this.appliances.getVolume();

    }
    setVolumeAppliances(amount) {
        this.appliances.setVolume(amount);
    }
}

class AdvancedRemote extends Remote {
    constructor(appliances) {

        this.appliances = appliances;
    }
    onAppliances() {
        this.appliances.turnOn();
    }
    ofAppliances() {
        this.appliances.turnOff();
    }
    getVolumeAppliances() {
        this.appliances.getVolume();
    }
    setVolumeAppliances(amount) {
        this.appliances.setVolume(amount);
    }
    muteAppliances() {
        this.appliances.setVolume(0);
    }
}


const tv = new Televisions();
const radio = new Radio();

const basicRemoteTv = new BasicRemote(tv);
const basicRemoteRadio = new BasicRemote(radio);
console.log("------------Basic Remote Television------------")
basicRemoteTv.onAppliances();
basicRemoteTv.setVolumeAppliances(50);
basicRemoteTv.getVolumeAppliances();
basicRemoteTv.ofAppliances();
console.log("------------Basic Remote Radio------------")
basicRemoteRadio.onAppliances();
basicRemoteRadio.setVolumeAppliances(50);
basicRemoteRadio.getVolumeAppliances();
basicRemoteRadio.ofAppliances();

const advancedRemoteTv = new AdvancedRemote(tv);
const advancedRemoteRadio = new AdvancedRemote(radio);
console.log("------------Advanced Remote Television------------")
advancedRemoteTv.onAppliances();
advancedRemoteTv.setVolumeAppliances(60);
advancedRemoteTv.getVolumeAppliances();
advancedRemoteTv.muteAppliances();
advancedRemoteTv.ofAppliances();
console.log("------------Advanced Remote Radio------------")
advancedRemoteRadio.onAppliances();
advancedRemoteRadio.setVolumeAppliances(60);
advancedRemoteRadio.getVolumeAppliances();
advancedRemoteRadio.muteAppliances()
advancedRemoteRadio.ofAppliances();


/*
 [Review] ⭐⭐⭐⭐ 4/5
 
 **Reviewer Feedback:**
 - Great job successfully implementing the core Bridge! You completely 
   decoupled the Remotes from the Appliances by injecting the Appliance object 
   into the constructor (Dependency Injection).
 - The execution works flawlessly and avoids the Cartesian explosion!
 - *Minor flaw:* You created the abstract `Remote` base class (line 127), but 
   your `BasicRemote` and `AdvancedRemote` classes forgot to actually `extends Remote`. Because of JS duck-typing it still works, but structurally you missed the inheritance on the abstraction side!
 
 **Cross-Pattern Question:**
 Since the `AdvancedRemote` needs to be able to mute things, 
 you added `.setVolume(0)` inside the remote itself. However, what if different 
 appliances need completely different internal logic to mute (e.g., a TV takes 
 2 seconds to mute, a Radio mutes instantly)? 
 Should the Remote handle the mute logic, or is there another Structural pattern 
 (like Facade or Adapter) you could use, or should the `Appliance` interface 
  just natively enforce a `mute()` method?

  ----------------------My answer----------------------
  I think here adapter pattern can be used. here beucase adapter pattern work as 
  a middle transfermer where it transfer clients data into requried format for class
  so it will be best suited here , 
  
  **Reviewer Response:**
  Excellent reasoning! If we assume that the `Appliance` classes are legacy or 
  third-party code that we *cannot modify*, then writing an **Adapter** to 
  translate the Remote's generic `mute()` call into the specific complex logic 
  required by the legacy TV or Radio is the absolute best choice.
  
  (If we *could* modify the source code of the Appliances, then simply adding a 
  `mute()` method to the `Appliance` interface and letting each device implement 
  it natively would be the cleanest approach, rather than the Remote handling 
  the logic).
 */
