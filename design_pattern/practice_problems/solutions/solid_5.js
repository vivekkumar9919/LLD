/**
 * **solid_5** (DIP): Build a `NotificationManager`. Instead of hardcoding 
 * `new SMSService()`, inject an abstract messaging dependency through the 
 * constructor so you can swap it for an `EmailService` instantly.
 * 
 */

class NotificationService {
    notify() {
        throw new Error("notify should be implemented");

    }
}

class EmailService extends NotificationService {
    notify() {
        console.log("Notifications through Email");
    }
}

class SMSService extends NotificationService {
    notify() {
        console.log("Notifications through SMS");
    }
}


class NotificationManager {
    constructor(service) {
        this.service = service;
    }
    sendNotifications() {
        this.service.notify();
    }
}

const email = new EmailService();
const sms = new SMSService();

const notifyEmail = new NotificationManager(email);
notifyEmail.sendNotifications();
const notifySMS = new NotificationManager(sms);
notifySMS.sendNotifications();

/*
=========================================
INTERROGATION QUESTIONS (Practice: solid_5)
=========================================
1. Duck Typing vs. Formal Contracts:
   Since JavaScript is dynamically typed and uses "duck typing", `NotificationManager` 
   will execute correctly as long as the injected object has a `.notify()` function, 
   regardless of whether it extends `NotificationService` or not. 
   Given this dynamic nature, isn't inheritance (`class EmailService extends 
   NotificationService`) a redundant design choice that introduces unnecessary 
   class coupling in JS? Defend the usage of the abstract base class 
   `NotificationService` in a production-grade JavaScript/Node.js LLD.

2. Broadcast and Dynamic Injection:
   Currently, `NotificationManager` only accepts a single service instance in the 
   constructor (Constructor Injection).
   - What if a business requirement emerges to send a notification to *both* Email and 
        SMS simultaneously for a critical transaction? How would you refactor `NotificationManager` 
        to support multiple services?
   - What is the difference between Constructor Injection, Method Injection, and 
        Setter Injection, and under what circumstances would you use each for injecting 
        these notification services?

---Vivek Answers---

1. Duck Typing vs. Formal Contracts:
    NotificationService base class is required because it a contract 
    between client code and the base class if notify is called and not defined in extends class 
    then it will throw runtime error, In production EmailService have different 
    business logic and SMSService have diffrent business logic,  
2.  Broadcast and Dynamic Injection:
    To support multiple services , i would add array of services in constructor and 
    iterate over the array and call notify for each service,    

--- AI EVALUATION ---
1. Duck Typing vs. Formal Contracts:
   - What is Right: You correctly identified that the base class acts as a contract, throwing a runtime error if a child class forgets to implement `.notify()`.
   - What is Wrong: Nothing.
   - What is Missing: In plain JavaScript, the compiler doesn't enforce this contract. However, in production, having this base class is useful for:
     * Enforcing runtime validation using type/instance assertions (e.g., `if (!(service instanceof NotificationService)) throw Error`).
     * Providing shared helper methods (like payload validation or logging) directly in the base class to avoid code repetition in subclasses.

2. Broadcast and Dynamic Injection:
   - What is Right: Reconfiguring the constructor to accept an array of services and iterating over them is a clean way to support broadcasting. (This is structurally similar to the **Composite Pattern**).
   - What is Wrong: You missed answering the second part of the question regarding injection types.
   - What is Missing: 
     * *Constructor Injection:* Dependency passed on instantiation. Use when the dependency is mandatory and stays constant for the object's lifetime.
     * *Setter Injection:* Injected via a setter method (e.g., `setService(s)`). Use when dependencies are optional or need to be swapped dynamically at runtime.
     * *Method Injection:* Injected as a parameter directly to the method that needs it (e.g., `sendNotifications(service, payload)`). Use when the dependency changes on every invocation.
*/


