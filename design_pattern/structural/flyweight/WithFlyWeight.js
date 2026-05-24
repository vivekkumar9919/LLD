
// Flyweight - Stores INTRINSIC state only
class AsteroidFlyweight {

    constructor(length, width, height, color, texture, material) {
        this.length = length;
        this.width = width;
        this.height = height;
        this.color = color;
        this.texture = texture;
        this.material = material;
        // Make the shared intrinsic state immutable
        Object.freeze(this);
    }

    render(posX, posY, velocityX, velocityY) {
        console.log(
            `Rendering ${this.color} ${this.texture} ${this.material}
             at ${posX}, ${posY}
             size ${this.length} ${this.width}
             velocity ${velocityX} ${velocityY}`
        );
    }

    getMemoryUsage() {
        return new Blob([JSON.stringify(this)]).size;
    }
}

// Flyweight Factory

class AsteroidFactory {

    constructor() {
        this.flyweights = new Map();
    }

    getAsteroid(length, width, height, color, texture, material) {

        const key =
            `${length}_${width}_${height}_${color}_${texture}_${material}`;

        if (this.flyweights.has(key)) {
            return this.flyweights.get(key);
        }

        const flyweight =
            new AsteroidFlyweight(
                length,
                width,
                height,
                color,
                texture,
                material
            );

        this.flyweights.set(key, flyweight);

        return flyweight;
    }

    getFlyweightCount() {
        return this.flyweights.size;
    }

    getTotalFlyweightMemory() {

        let total = 0;

        for (const flyweight of this.flyweights.values()) {
            total += flyweight.getMemoryUsage();
        }

        return total;
    }
}

// Context - Stores EXTRINSIC state only
class AsteroidContext {

    constructor(flyweight, posX, posY, velocityX, velocityY) {

        this.flyweight = flyweight;

        this.posX = posX;
        this.posY = posY;

        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    render() {
        this.flyweight.render(
            this.posX,
            this.posY,
            this.velocityX,
            this.velocityY
        );
    }

    getMemoryUsage() {
        // Exclude the shared flyweight object to avoid double-counting.
        // Stringify only the extrinsic state and add 8 bytes for the pointer reference.
        const extrinsicState = {
            posX: this.posX,
            posY: this.posY,
            velocityX: this.velocityX,
            velocityY: this.velocityY
        };
        return new Blob([JSON.stringify(extrinsicState)]).size + 8;
    }
}

class SpaceGameWithFlyweight {

    constructor() {
        this.asteroids = [];
        this.factory = new AsteroidFactory();
    }

    spawnAsteroids(count) {

        const colors = ["Red", "Blue", "Gray"];
        const textures = ["Rocky", "Metallic", "Icy"];
        const materials = ["Iron", "Stone", "Ice"];
        const sizes = [25, 35, 45];

        for (let i = 0; i < count; i++) {

            const type = i % 3;

            const flyweight =
                this.factory.getAsteroid(
                    sizes[type],
                    sizes[type],
                    sizes[type] * 10,
                    colors[type],
                    textures[type],
                    materials[type]
                );

            this.asteroids.push(
                new AsteroidContext(
                    flyweight,
                    100 + i * 50,
                    200 + i * 30,
                    1,
                    2
                )
            );
        }

        console.log("Asteroids:", this.asteroids.length);

        console.log(
            "Flyweights:",
            this.factory.getFlyweightCount()
        );
    }

    renderAll() {
        for (const asteroid of this.asteroids) {
            asteroid.render();
        }
    }
    getAsteroidCount() {
        return this.asteroids.length;
    }

    calculateMemoryUsage() {
        let totalContextMemory = 0;
        for (const asteroid of this.asteroids) {
            totalContextMemory += asteroid.getMemoryUsage();
        }
        return this.factory.getTotalFlyweightMemory() + totalContextMemory;
    }
}

const ASTEROID_COUNT = 15;

const game = new SpaceGameWithFlyweight();

game.spawnAsteroids(ASTEROID_COUNT);

game.renderAll();

console.log(
    "Total Context Objects ---",
    game.getAsteroidCount()
);

console.log(
    "Total Flyweight Objects ---",
    game.factory.getFlyweightCount()
);

console.log(
    "Flyweight Shared Memory ---",
    game.factory.getTotalFlyweightMemory()
);

console.log(
    "Total Memory Usage ---",
    game.calculateMemoryUsage()
);

/*
=========================================
INTERROGATION QUESTIONS (Flyweight LLD)
=========================================
1. Mutation Protection:
   JavaScript objects are mutable by default. If a developer gets a shared flyweight instance from your factory and executes:
   `sharedFlyweight.color = "Hot Pink";`
   What happens to every other asteroid currently using that flyweight? 
   How do you prevent this modification of the shared intrinsic state in JS?

2. E-commerce Application:
   In your e-commerce backend background, imagine we need to build a system handling 1 million shopping carts or catalogs. 
   How would you apply the Flyweight pattern to reduce server memory usage? 
   What would be the Intrinsic and Extrinsic states?


My Answer:
1. we can freeze the java script object to make it immutable , impact of this map keys do no change only 
   value get changes so we are getting wrong asteroids here 

2. Cart have muliples details like product id , color , size , price , type these
   will be the intrinsic state and customer id , order id , quantity , and address c
   can be a extrinsic state 

   
--- AI EVALUATION ---
1. Mutation Protection:
   - What is Right: You correctly identified `Object.freeze()` as the solution in JS to enforce immutability. You also correctly recognized the fatal map-key association bug: since the map key remains unchanged, mutating the cached object results in the factory returning the mutated object for old keys.
   - What is Wrong: Nothing.
   - What is Missing: You didn't explicitly implement `Object.freeze(this)` inside the `AsteroidFlyweight` constructor yet.
   
2. E-commerce Application:
   - What is Right: Your segregation of static product characteristics (product ID, color, size, price, type) as intrinsic, and user-specific details (customer ID, order ID, quantity, address) as extrinsic is correct.
   - What is Wrong: Nothing, but note that the address is typically customer-specific rather than cart-item specific.
   - What is Missing: A brief description of how the factory fits in (e.g., caching the Product catalog objects so they are referenced rather than duplicated across millions of user cart sessions).
*/