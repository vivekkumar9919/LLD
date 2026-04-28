
// Simple factory 

/** 
class Burger {

    prepareBurger() { };
}

class BasicBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic BasicBurger");
    }
}

class StandardBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic StandardBurger");
    }
}

class PremiumBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic PremiumBurger");
    }
}


class BurgerFactory {
    createBurger(type) {
        if (type == "basic") {
            return new BasicBurger();
        }
        else if (type == 'standard') {
            return new StandardBurger();
        }
        else if (type == "premium") {
            return new PremiumBurger();
        }
        else {
            console.log("Unknown event type");
        }
    }
}



const basicObj = factory.createBurger("basic");
basicObj.prepareBurger();

const standardObj = factory.createBurger("standard");
standardObj.prepareBurger();

const premiumObj = factory.createBurger("premium");
premiumObj.prepareBurger();

*/


// Factory pattern 

/**
class Burger {

    prepareBurger() { 
        throw new Error("Method must be implemented")
    };
}

class BasicBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic BasicBurger");
    }
}

class StandardBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic StandardBurger");
    }
}

class PremiumBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic PremiumBurger");
    }
}

class BasicWheatBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic BasicWheatBurger");
    }
}

class StandardWheatBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic StandardWheatBurger");
    }
}

class PremiumWheatBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic PremiumWheatBurger");
    }
}




class BurgerFactory {
    createBurger(type) {
        throw new Error("Method must be implemented")
    }
}

class HealthyFactory extends BurgerFactory {
    createBurger(type) {
        if (type == "basic") {
            return new BasicWheatBurger();
        }
        else if (type == 'standard') {
            return new StandardWheatBurger();
        }
        else if (type == "premium") {
            return new PremiumWheatBurger();
        }
        else {
            console.log("Unknown event type");
        }
    }
}

class UnHealthyFactory extends BurgerFactory {
    createBurger(type) {
        if (type == "basic") {
            return new BasicBurger();
        }
        else if (type == 'standard') {
            return new StandardBurger();
        }
        else if (type == "premium") {
            return new PremiumBurger();
        }
        else {
            console.log("Unknown event type");
        }
    }
}


// Healthy Factory 
const healthyFactory = new HealthyFactory()
const basicObjHealthy = healthyFactory.createBurger("basic");
basicObjHealthy.prepareBurger();

const standardObjHealthy = healthyFactory.createBurger("standard");
standardObjHealthy.prepareBurger();

const premiumObjHealthy = healthyFactory.createBurger("premium");
premiumObjHealthy.prepareBurger();

// Unhealthy Factory 
const unHealthyFactory = new UnHealthyFactory()
const basicObjUnHealthy = unHealthyFactory.createBurger("basic");
basicObjUnHealthy.prepareBurger();

const standardObjUnHealthy = unHealthyFactory.createBurger("standard");
standardObjUnHealthy.prepareBurger();

const premiumObjUnHealthy = unHealthyFactory.createBurger("premium");
premiumObjUnHealthy.prepareBurger();

 */

// Abstract pattern 

class Burger {
    prepareBurger() {
        throw new Error("Method must be implemented")
    };
}

class BasicBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic BasicBurger");
    }
}

class StandardBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic StandardBurger");
    }
}

class PremiumBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic PremiumBurger");
    }
}

class BasicWheatBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic BasicWheatBurger");
    }
}

class StandardWheatBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic StandardWheatBurger");
    }
}

class PremiumWheatBurger extends Burger {
    prepareBurger() {
        console.log("Preparing a Basic PremiumWheatBurger");
    }
}

class Garlic {
    prepareGarlic() { throw new Error("Method must be implemented") };
}

class BasicGarlicBread extends Garlic {
    prepareGarlic() {
        console.log("Preparing a Basic BasicGarlic");
    }
}

class CheeseGarlicBread extends Garlic {
    prepareGarlic() {
        console.log("Preparing a Basic CheeseGarlic");
    }
}
class BasicGarlicWheatBread extends Garlic {
    prepareGarlic() {
        console.log("Preparing a Basic BasicGarlicWheatBread");
    }
}

class CheeseGarlicWheatBread extends Garlic {
    prepareGarlic() {
        console.log("Preparing a Basic CheeseGarlicWheatBread");
    }
}




class Meal {
    createBurger(type) {
        throw new Error("Method must be implemented")
    }
    createGarlicBread(type) {
        throw new Error("Method must be implemented")

    }
}

class HealthyFactory extends Meal {
    createBurger(type) {
        if (type == "basic") {
            return new BasicWheatBurger();
        }
        else if (type == 'standard') {
            return new StandardWheatBurger();
        }
        else if (type == "premium") {
            return new PremiumWheatBurger();
        }
        else {
            console.log("Unknown event type");
        }
    }
    createGarlicBread(type) {
        if (type == "basic") {
            return new BasicGarlicWheatBread();
        }
        else if (type == 'cheese') {
            return new CheeseGarlicWheatBread();
        }
        else {
            console.log("Unknown event type");
        }
    }
}

class UnHealthyFactory extends Meal {
    createBurger(type) {
        if (type == "basic") {
            return new BasicBurger();
        }
        else if (type == 'standard') {
            return new StandardBurger();
        }
        else if (type == "premium") {
            return new PremiumBurger();
        }
        else {
            console.log("Unknown event type");
        }
    }
    createGarlicBread(type) {
        if (type == "basic") {
            return new BasicGarlicBread();
        }
        else if (type == 'cheese') {
            return new CheeseGarlicBread();
        }
        else {
            console.log("Unknown event type");
        }
    }
}


// Healthy Factory 
const healthyFactory = new HealthyFactory()
const basicBurgerHealthy = healthyFactory.createBurger("basic");
basicBurgerHealthy.prepareBurger();

const basicGarlicHealthy = healthyFactory.createGarlicBread("basic");
basicGarlicHealthy.prepareGarlic();

const standardBurgerHealthy = healthyFactory.createBurger("standard");
standardBurgerHealthy.prepareBurger();
const standardGarlicHealthy = healthyFactory.createGarlicBread("cheese");
standardGarlicHealthy.prepareGarlic();

