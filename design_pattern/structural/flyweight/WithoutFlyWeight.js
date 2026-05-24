
class Asteroid {

    constructor(length, width, height, color, texture, material, posX, posY, velocityX, velocityY) {
        this.length = length,
            this.width = width,
            this.height = height,
            this.color = color,
            this.texture = texture,
            this.material = material,
            this.posX = posX,
            this.posY = posY,
            this.velocityX = velocityX,
            this.velocityY = velocityY
    }

    render() {
        console.log("Rendering" + " " + this.color + " " + this.texture + " " + this.material + " " + "at " + this.posX + " " + this.posY + " " + "Size " + this.length + " " + this.width + " " + "velocity " + this.velocityX + " " + this.velocityY)
    }
    getMemoryUsage() {
        return new Blob([JSON.stringify(this)]).size;
    }

}

class SpaceGame {
    constructor(){
        this.asteroids = []
    }
    spawnAsteroids(count) {
        console.log(`\n=== Spawning ${count} asteroids ===`);

        const colors = ["Red", "Blue", "Gray"];
        const textures = ["Rocky", "Metallic", "Icy"];
        const materials = ["Iron", "Stone", "Ice"];
        const sizes = [25, 35, 45];

        for (let i = 0; i < count; i++) {
            const type = i % 3;

            this.asteroids.push(
                new Asteroid(
                    sizes[type],
                    sizes[type],
                    sizes[type] * 10,
                    colors[type],
                    textures[type],
                    materials[type],
                    100 + i * 50,
                    200 + i * 30,
                    1,
                    2
                )
            );
        }

        console.log(`Created ${this.asteroids.length} asteroid objects`);
    }
    renderAll(){
        for(let i =0;i<this.asteroids.length;i++){
            this.asteroids[i].render();
        }
    }
    calculateMemoryUsage(){
        return  this.asteroids.length? this.asteroids.length* this.asteroids[0].getMemoryUsage() : 0;
    }
    getAsteroidCount() { 
        return this.asteroids.length; 
    }

}

const ASTEROID_COUNT = 5;

const game = new SpaceGame();
game.spawnAsteroids(ASTEROID_COUNT);
game.renderAll();
console.log("Total Memory uses ---", game.calculateMemoryUsage());
console.log("Total Asteroid count ---", game.getAsteroidCount());

