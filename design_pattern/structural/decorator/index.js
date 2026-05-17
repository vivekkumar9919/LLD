
class Character {
    getAbilities() {
        throw new Error("Character should be implemented")
    }
}

class Mario extends Character {
    getAbilities() {
        return "Mario with "
    }
}

class CharacterDecorator extends Character {
    constructor(character) {
        super();
        if (this.constructor === CharacterDecorator) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.character = character;
    }
    getAbilities() {
        return this.character.getAbilities();
    }
}

class HeightUp extends CharacterDecorator {
    getAbilities() {
        return super.getAbilities() + "+ Height Up";
    }
}

class GunPower extends CharacterDecorator {
    getAbilities() {
        return super.getAbilities() + "+ Gun Power ";
    }
}

// const marioGun  = new GunPower(new HeightUp(new Mario));

// const marioGunPower = marioGun.getAbilities();

// console.log(marioGunPower);


// const marioHeigh  = new HeightUp(new Mario);

// const marioHeighPower = marioHeigh.getAbilities();

// console.log(marioHeighPower);

const mario = new Mario();
console.log("Basic ->", mario.getAbilities());

const marioHeighPower = new HeightUp(mario);
console.log("Height Up power ->", marioHeighPower.getAbilities());

const marioGunPower = new GunPower(marioHeighPower);
console.log("Gun Power ->", marioGunPower.getAbilities());

/**
 * 🎙️ INTERROGATION - LLD REVIEWER
 * 
 * 1. The Liskov Substitution Trap: In the classic GoF Decorator pattern, 
 *    the Decorator MUST implement the exact same interface (or extend the same 
 *    base class) as the object it is decorating. Why didn't `HeightUp` and 
 *    `GunPower` extend `Character`? What problem does skipping that step 
 *    cause in a strongly typed language (or a strict JS codebase)?
 * 
 * 2. The Base Decorator: Usually, we create an abstract `CharacterDecorator` 
 *    class that handles holding the `character` reference, and then `HeightUp` 
 *    extends THAT class. What is the benefit of having a base Decorator class 
 *    instead of having every concrete decorator implement the constructor manually?
 * 
 * 3. Naming & Coupling: You named the constructor parameter `mario` inside your 
 *    decorators (e.g., `constructor(mario)`). Why is this a red flag for 
 *    code reusability?
 * 
 * --- VIVEK'S ANSWERS ---
 * 2. In a robust system, you don't want every single power-up to manually 
 *    implement the constructor and store the reference. Usually, 
 *    you create an abstract CharacterDecorator extends Character class, 
 *    and then HeightUp extends that.
 * 3. Naming should not be specific to the class name. its should be generic
 * 
 *  
 * 
 */
