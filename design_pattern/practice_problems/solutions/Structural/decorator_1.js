/**
 **decorator_1** (Coffee Shop): Preventing Class Explosion
 
 ### The Scenario (Interview Style)
 You are building a point-of-sale system for a rapidly growing Coffee Shop. 
 A junior developer tried to model the menu using inheritance. They created a 
 `Coffee` base class, and then started making subclasses: `CoffeeWithMilk`, 
 `CoffeeWithMocha`, `CoffeeWithMilkAndMocha`, `CoffeeWithWhip`, 
 `CoffeeWithMilkAndWhip`, etc.
 
 This resulted in a massive **"class explosion."** Every time the shop adds a new 
 topping (like Caramel), the developer has to create 15 new subclasses just to 
 cover all the possible combinations!
 
 ### Your Task
 Implement the **Decorator Pattern** to fix this class explosion.
 
 1. Create a base `Coffee` class with `.cost()` (returns 5) and 
    `.getDescription()` (returns "Basic Coffee").
 2. Create independent Decorator classes for toppings: `Milk` (adds 2), 
    `Mocha` (adds 3), and `Whip` (adds 1).
 3. These Decorators must wrap an existing beverage (passed into their constructor). 
    When `.cost()` or `.getDescription()` is called on the decorator, it should 
    call the wrapped object's method and dynamically append its own value.
 
 Prove it works by writing client code that creates a Base Coffee, wraps it in Milk, 
 wraps it in Mocha TWICE (a Double Mocha!), and wraps it in Whip. 
 Log the final `.cost()` and `.getDescription()`.
 */


class Coffee {

   cost() {
      throw new Error("cost Should be implemented")
   }
   getDescription() {
      throw new Error("getDescription Should be implemented")
   }
}

class BasicCoffee extends Coffee {
   cost() {
      return 5;
   }
   getDescription() {
      return "Basic Coffee"
   }
}
class CoffeeDecorator extends Coffee {
   constructor(coffee) {
      super();
      if (this.constructor === CoffeeDecorator) {
         throw new Error("Abstract classes can't be instantiated.");
      }
      this.coffee = coffee;
   }
   cost() {
      return this.coffee.cost();
   }
   getDescription() {
      return this.coffee.getDescription();
   }
}

class Milk extends CoffeeDecorator {

   cost() {

      return super.cost() + 2;
   }
   getDescription() {
      return super.getDescription() + "+ With MILK"
   }
}

class Mocha extends CoffeeDecorator {

   cost() {
      return super.cost() + 3;
   }
   getDescription() {
      return super.getDescription() + "+ With MOCHA"
   }
}
class Whip extends CoffeeDecorator {

   cost() {
      return super.cost() + 1;
   }
   getDescription() {
      return super.getDescription() + "+ With WHIP"
   }
}

const coffee = new BasicCoffee()
console.log("coffee--->", { cost: coffee.cost(), description: coffee.getDescription() });

const coffeeMilk = new Milk(coffee);
console.log("coffee + milk--->", { cost: coffeeMilk.cost(), description: coffeeMilk.getDescription() });

const coffeeMilkMocha = new Mocha(coffeeMilk);
console.log("coffee + milk + Mocha--->", { cost: coffeeMilkMocha.cost(), description: coffeeMilkMocha.getDescription() });

const coffeeMilkDoubleMocha = new Mocha(coffeeMilkMocha);
console.log("coffee + milk + double Mocha--->", { cost: coffeeMilkDoubleMocha.cost(), description: coffeeMilkDoubleMocha.getDescription() });

const coffeeMilkMochaWhip = new Whip(coffeeMilkMocha);
console.log("coffee + milk + Mocha + Whip--->", { cost: coffeeMilkMochaWhip.cost(), description: coffeeMilkMochaWhip.getDescription() });

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================
**Rating:** ⭐⭐⭐⭐ (4/5)

### 🚨 Code Issues & Concept Check
Your implementation of the **Decorator Pattern** is phenomenally good! 

You correctly understood the magic formula for decorators: 
**Inheritance + Composition.**
1. You used Inheritance (`extends CoffeeDecorator`) so that every topping is guaranteed to have `.cost()` and `.getDescription()`. 
2. You used Composition (`this.coffee = coffee`) so you can wrap them infinitely like nesting dolls.

You even added an abstract class check (`if (this.constructor === CoffeeDecorator)`). Very impressive!

So why 4 out of 5 stars? You missed one small instruction in the prompt!
The prompt said: *"wraps it in Mocha TWICE (a Double Mocha!)"*

### 🧠 Next Steps
Update your test code at the bottom to create a **Double Mocha**! 
I want you to see exactly why the Decorator pattern is so powerful. Because it uses composition, you can do things like `new Mocha(new Mocha(new Coffee()))` to stack the exact same topping multiple times without creating a `DoubleMochaCoffee` class!

Add the double mocha to your test chain and ping me for the 5/5!
================================================================================
*/

/*
--------------------------------------------------------------------------------
🏆 FINAL EVALUATION (Iteration 2)
--------------------------------------------------------------------------------
**Rating:** ⭐⭐⭐⭐⭐ (5/5)

**Code Review:** Exactly! By writing `new Mocha(coffeeMilkMocha)`, you stacked a second Mocha on top of the first one. 

This is the true power of the **Decorator Pattern**. In a legacy inheritance model, adding a "Double Mocha" would require you to create a `DoubleMochaCoffee` class, a `MilkDoubleMochaCoffee` class, a `WhipDoubleMochaCoffee` class, etc. (Class Explosion).

But with Decorators, you just do `new Mocha(new Mocha(coffee))` and you instantly get a Double Mocha! It dynamically calculates the cost and description at runtime by bubbling up through the wrapped objects.

Your implementation of `CoffeeDecorator` with both `extends Coffee` (to maintain the type) and `this.coffee = coffee` (to hold the wrapped instance) is absolutely perfect.

**Status:** ✅ Completed! 
================================================================================
*/