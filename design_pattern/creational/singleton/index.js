
// Basic

class Singleton {
    constructor() {
        console.log("Singleton class called, new object created");
        // Best Practice: Throw an error instead of replacing the object!
        if (Singleton._instance) {
            throw new Error("Singleton exists! Use Singleton.getInstance() instead");
        }
        Singleton._instance = this;
    }

    static getInstance() {
        if (!Singleton._instance) {
            Singleton._instance = new Singleton();
        }
        return Singleton._instance;
    }
}

// const fakeS1 = new Singleton(); // This will deliberately throw an Error now!
const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();

console.log("Are they the exact same object?", s1 === s2);


// Thread safe 

// class Singleton {
//     static instance = null;
//     static initializing = null;

//     static async createDBConnection() {
//         return true;
//     }

//     static async getInstance() {
//         if (Singleton.instance) {
//             return Singleton.instance;
//         }

//         if (!Singleton.initializing) {
//             Singleton.initializing = (async () => {
//                 console.log("Creating instance...");
//                 const obj = await this.createDBConnection(); 
//                 Singleton.instance = obj;
//                 return obj;
//             })();
//         }

//         return Singleton.initializing;
//     }
// }

// const s1 = await Singleton.getInstance();
// const s2 = await Singleton.getInstance();

// console.log(s1 === s2); 


// ✅ Eager Initialization in JS

class Singleton {
    constructor() {
        console.log("Instance created");
    }
}

// created immediately
const instance = new Singleton();

export default instance;