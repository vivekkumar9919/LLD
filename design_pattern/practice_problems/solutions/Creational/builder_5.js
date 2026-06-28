/**
 **builder_5** (Game Character): The Validation Builder
 
 ### The Scenario (Interview Style)
 You are building the core engine for a new RPG video game. A `Character` in this 
 game is a massive, complex object. It contains:
 - A Name
 - Core Stats (Strength, Dexterity, Intelligence, Health)
 - A list of Equipment (e.g., "Iron Sword", "Leather Armor")
 - A list of Abilities (e.g., "Fireball", "Stealth")

 Constructing a Character in one constructor would be a nightmare (`new Character("Bob", 10, 5, 20, 100, ["Sword"], ["Slash"])`). 
 So, you decide to use a Fluent Builder.

 ### The Requirements
 1. **Additive Methods:** The builder should have methods like `.addEquipment(item)` 
    and `.addAbility(ability)`. These should append to the list, allowing a developer 
    to chain `.addEquipment('Sword').addEquipment('Shield')`.
 2. **Complex Grouping:** It should have a `.setStats(strength, dexterity, intelligence, health)` 
    method to set all core stats at once.
 3. **The Validation Rule (Crucial):** Your game engine will fatally crash if a 
    Character is spawned into the world with less than 100 Health. Therefore, your 
    builder's `build()` method must perform a final **validation check**. If the 
    health is not set, or is less than 100, `build()` MUST throw an Error and refuse 
    to return the Character object.

 ### Your Task
 Build the `CharacterBuilder` that supports these requirements. 
 
 *(Reminder: I will not give you the class or property names. You must design the 
 architecture yourself!)*
 */

class CharacterBuilder {
    constructor(name) {
        this.name = name;
        this.ability = [];
        this.equipment = [];
        this.stats = {};
    }
    addAbility(ability) {
        if (!this.ability.includes(ability))
            this.ability.push(ability);
        return this;
    }
    addEquipment(equipment) {
        if (!this.equipment.includes(equipment))
            this.equipment.push(equipment);
        return this;
    }
    setStats(strength, dexterity, intelligence, health) {
        this.stats.strength = strength;
        this.stats.dexterity = dexterity;
        this.stats.intelligence = intelligence;
        this.stats.health = health;
        return this;
    }
    #validation() {
        // checking only for stats and health not other keys , if required we will add more stats keys here
        if (this.stats && this.stats.health >= 100) return true;
        return false;
    }
    build() {
        let validCharacter = this.#validation()
        if (validCharacter) {
            return { ability: this.ability, equipment: this.equipment, stats: this.stats };
        }
        else {
            throw new Error("In valid character stats");
        }
    }
}

const character1 = new CharacterBuilder("vivek").addAbility("Fireball").addEquipment("Sword").setStats(10, 5, 20, 100).build();
console.log(character1);
const character2 = new CharacterBuilder("vivek").addAbility("Stealth").addAbility("Stealth").addEquipment("Sword").setStats(10, 5, 20, 50).setStats(10, 5, 20, 200).build();
console.log(character2);

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================
**Rating:** ⭐⭐⭐⭐⭐ (5/5)

### 🚨 Code Issues & Concept Check
You absolutely nailed the **Validation Builder**! 

This pattern is incredibly useful in real-world applications. By returning 
`this` at every step, you collect all the state, but by putting a "bouncer" 
inside `build()`, you guarantee that no invalid objects ever enter your game engine.

I also love a few specific things you did:
1. **Duplicate Prevention:** Checking `if(!this.ability.includes(ability))` was a 
great edge-case catch!
2. **State Overwriting:** In `character2`, you beautifully demonstrated why 
builders are great. The developer accidentally set health to 50, 
but because the builder holds state, they were able to just call `.setStats()`
 *again* with 200 health to fix it before calling `.build()`!

*(The only tiny bug is that you forgot to include `name: this.name` inside your final 
returned object, but structurally, the pattern is flawless!)*

### 🧠 Deep Dive Questions
1. **Pattern Mastery:** We just covered 5 very different ways to use the Builder pattern: 
   - Fluent Builder (`builder_1`)
   - Director Pattern (`builder_2`)
   - Step Builder (`builder_3`)
   - Stateful Builder (`builder_4`)
   - Validation Builder (`builder_5`)
   Out of all of these, which one do you think is the most useful for your 
   day-to-day work, and why?

**Status:** ✅ Completed! 

Congratulations on finishing the entire Builder Pattern section!
================================================================================
1. To indentify the best out of these first we need to know the requriement becuase 
all design pattern are good , it totaly depend on use case and tradeoff may be some 
places director is good and at some other places steps will be good so i will choose 
totaly based on use cases and analysis.
as mostly work in api building so i can build a api builders using the director 
pattern where i can build the methods like post, get, put ,patch and delete 
*/