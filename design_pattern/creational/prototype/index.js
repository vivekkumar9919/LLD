
// Without prototype

/** 
class User {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log(`Hi ${this.name}`);
    }
}

const u1 = new User("Vivek");
const u2 = new User("Rahul");

u1.sayHi();
u2.sayHi();

*/

// With prototype js 

// function User(name) {
//     this.name = name;
// }

// User.prototype.sayHi = function () {
//     console.log(`Hi ${this.name}`);
// };

// const u1 = new User("Vivek");
// const u2 = new User("Rahul");

// u1.sayHi();
// u2.sayHi();


// with prototype design pattern

class Resume {
    constructor(name, skills) {
        this.name = name;
        this.skills = skills;
    }

    clone() {
        return new Resume(
            this.name,
            [...this.skills]
        );
    }
}

const original = new Resume(
    "Vivek",
    ["NodeJS", "MongoDB"]
);

const copy = original.clone();
// const copy  = original

// copy.name = "Rahul";
// console.lof()
console.log(copy === original);
console.log(original);
console.log(copy);

/*
=========================================
INTERVIEW FOLLOW-UP QUESTIONS & ANSWERS
=========================================
Q1: If `skills` array contained nested objects (e.g., [{name: 'NodeJS'}]), what happens when using `[...this.skills]`?
A1: The original gets changed because the nested objects are passed by reference, so they share the same memory locations (Shallow Copy).

Q2: If `Resume` held an active socket connection or dbClient, how would clone() handle it?
A2: Generally, sockets/connections cannot be cloned safely. They would either share the same socket (risky) or need to be re-initialized.

Q3: What modern JavaScript tricks/APIs can be used for deep cloning instead of manual recursion?
A3: `structuredClone()` is the native JS method. We can also use `lodash.cloneDeep()`.
*/

/**
1. The Deep Clone Dilemma: Exactly. If you only do a shallow copy, the skills array itself is new, but the objects inside the array still point to the same memory locations as the original. Mutating the nested objects mutates them everywhere.
2. Resource References: Correct. Sockets, file streams, and DB connections generally cannot and should not be cloned. The clone would either need to establish its own fresh connection or explicitly be designed to share it (which is risky).
3. Modern JavaScript Tricks: structuredClone() is the perfect answer. It's the modern, built-in standard for deep cloning in JS, replacing the old JSON.parse(JSON.stringify()) hack (which loses functions and dates). And yes, lodash.cloneDeep is the classic library approach.
 */



