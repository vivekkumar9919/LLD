/**
 **factory_2** (Abstract Factory): Build a `CrossPlatformUI` toolkit. Create an Abstract Factory `UIFactory` 
 that produces `Button` and `Checkbox`. Implement concrete factories `WindowsFactory` and `MacFactory` to produce 
 OS-specific variants.
 */

class Button {
    render() {
        throw new Error("Method 'render()' must be implemented.");
    }
}
class CheckBox {
    toggle() {
        throw new Error("Method 'toggle()' must be implemented.");
    }
}

class WindowButton extends Button {
    render() {
        console.log("Window button render ");
    }
}
class WindowCheckBox extends CheckBox {
    toggle() {
        console.log("Window checkbox toggle ");
    }
}
class MacButton extends Button {
    render() {
        console.log("MAC button render ");
    }
}
class MacCheckBox extends CheckBox {
    toggle() {
        console.log("MAC checkbox toggle ");
    }
}

class UIFactory {
    createButton() {
        throw new Error("Method 'createButton()' must be implemented.")
    }
    createCheckBox() {
        throw new Error("Method 'createCheckBox()' must be implemented.")
    }
}

class WindowFactory extends UIFactory {
    createButton() {

        return new WindowButton();

    }
    createCheckBox() {

        return new WindowCheckBox();


    }
}
class MacFactory extends UIFactory {
    createButton() {

        return new MacButton();

    }
    createCheckBox() {

        return new MacCheckBox();


    }
}

class RenderApp {
    constructor(factory) {
        this.factory = factory;
    }
    views() {
        this.button = this.factory.createButton();
        this.button.render();
        this.checkbox = this.factory.createCheckBox();
        this.checkbox.toggle();
    }
}
const renderAppWindow = new RenderApp(new WindowFactory);
renderAppWindow.views();

const renderAppMac = new RenderApp(new MacFactory);
renderAppMac.views();



/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================
**Rating:** ⭐⭐⭐ (3/5)

### 🚨 Code Issues & Concept Check
You have successfully implemented the class hierarchy for the Abstract Factory 
pattern! You correctly defined the Abstract Products (`Button`, `CheckBox`), 
Concrete Products, Abstract Factory (`UIFactory`), and Concrete Factories.

However, you brought over a bad habit from the "Simple Factory" pattern: passing 
strings!

Look at this code:
```javascript
createButton(type) {
    if (type.toLowerCase() == 'button') {
        return new WindowButton();
    }
}
```
**Why is this a problem?** 
1. The method is literally called `createButton()`. It doesn't need you to tell it you want a `'button'`. 
2. If you pass `createButton('dropdown')`, it silently fails and returns `undefined`.

In a true Abstract Factory, the concrete factory methods take **zero arguments**. `WindowFactory.createButton()` simply does exactly one thing: `return new WindowButton();`.

Secondly, the true power of an Abstract Factory is in the Client code. Instead of doing `new WindowFactory().createButton()` directly inline, you usually pass the whole factory into a generic function, like this:
```javascript
function renderApp(factory) {
    const btn = factory.createButton();
    const chk = factory.createCheckBox();
    btn.render();
    chk.toggle();
}
renderApp(new WindowFactory()); // Boom! Entire app is now Windows mode.
```

### 🧠 Deep Dive Questions
1. **Cross-Pattern Context:** Imagine if your `WindowFactory` was also implemented 
as a **Singleton**. Why is combining Singleton and Abstract Factory often a very good 
idea? (Think about memory and performance).

**Next Steps:** Refactor the factories to remove the useless `type` string arguments, create a generic `renderApp(factory)` client function to test it, drop your answer below, and ping me for a re-review! Let's get that rating up to a 5/5!
================================================================================
1. yes we can combine singleton and abstract factory because  in  abstract factory the concrete factories are created once and reused throughout the application. if we use singleton then it will ensure that only one instance of the factory is created and reused throughout the application.

--------------------------------------------------------------------------------
🏆 FINAL EVALUATION
--------------------------------------------------------------------------------
**Rating:** ⭐⭐⭐⭐⭐ (5/5)

**Code Review:** Flawless! By removing the string arguments, you restored the strong 
typing and compile-time safety of the Abstract Factory pattern. 
Your `RenderApp` class perfectly demonstrates the core principle: 
the client code asks for UI elements and renders them without ever needing 
to know or care which OS it is currently running on.

**Q1 (Singleton + Abstract Factory):** Exactly. Concrete Factories rarely hold any 
internal state; they just exist to contain the creation logic. Therefore, 
constantly doing `new WindowFactory()` is a waste of memory. Implementing them 
as Singletons is a highly recommended best practice!

**Status:** ✅ Completed! 
================================================================================
*/