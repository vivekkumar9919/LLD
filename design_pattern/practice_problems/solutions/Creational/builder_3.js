/**
 **builder_3** (Stepwise Form): Build a `RegistrationFormBuilder` using 
 the **Step Builder** pattern. Enforce the sequence: 
 `Username -> Email -> Password -> (Optional) ProfilePic -> Build`.

 ### The Scenario (Interview Style)
 You are building a User Registration SDK for other developers to use. 
 A valid registration must strictly provide data in this exact order:
 1. Username
 2. Email
 3. Password

 Once the password is provided, the developer can *optionally* provide a Profile 
 Picture, or they can immediately call `build()`.

 ### The Problem
 If you use a normal Fluent Builder (where every method just `return this;`), a 
 developer could write: `new RegistrationBuilder().setPassword('123').build();`. 
 They completely skipped the username and email, and your system crashes!

 ### Your Task
 You must implement the **Step Builder** pattern. 
 
 Instead of returning `this`, each step of your builder should return a specific 
 object that *only* exposes the method for the NEXT allowed step. 
 
 For example, when `setUsername('bob')` is called, it should not return the whole 
 builder. It should return an object that ONLY has the `setEmail()` method. 

 This forces the developer to follow the exact sequence you define. 
 
 *Note: In Java or TypeScript, this is done using Interfaces. In plain JavaScript, 
 you will have to get creative with returning specific objects containing closures 
 or bound methods!*
 */


class Formdata {
    constructor({ name, emailId, password, profilePic }) {
        this.username = name;
        this.email = emailId;
        this.password = password;
        this.profilePic = profilePic;
    }
}

class UsernameStep {
    username(name) {
        if (!name) {
            throw new Error("Name is required field");
        }
        return new EmailStep({ name });
    }
}

class EmailStep {
    constructor(data) {
        this.data = data;
    }
    email(emailId) {
        if (!emailId) throw new Error("EmailId is required field");
        return new PasswordSteps({ ...this.data, emailId });
    }
}

class PasswordSteps {
    constructor(data) {
        this.data = data;
    }
    password(password) {
        if (!password) {
            throw new Error("Password is required field");
        }
        return new OptionalSteps({ ...this.data, password })
    }
}

class OptionalSteps {
    constructor(data) {
        this.data = data;
    }
    profilePic(pic) {
        if (!pic) {
            throw new Error("Pic is required field");
        }
        this.data.profilePic = pic
        return this;
    }
    build() {
        return new Formdata(this.data);
    }
}

class CreateForm {
    static create() {
        return new UsernameStep();
    }
}

const form1 = CreateForm.create().username("vivek").email("vns@gmail.com").password("12344").build();
const form2 = CreateForm.create().username("vivek").email("vns@gmail.com").password("12344").profilePic("pic.img").build();
// console.log(form1);
// console.log(form2);

class EfficientRegistrationBuilder {
    constructor() {
        this.data = {};
    }

    // Step 1: Returns an object that only has the 'email' method
    username(name) {
        if (!name) throw new Error("Name is required");
        this.data.username = name;
        
        return {
            email: this.email.bind(this)
        };
    }

    // Step 2: Returns an object that only has the 'password' method
    email(emailId) {
        if (!emailId) throw new Error("Email is required");
        this.data.email = emailId;
        
        return {
            password: this.password.bind(this)
        };
    }

    // Step 3: Returns an object that has 'profilePic' AND 'build'
    password(pass) {
        if (!pass) throw new Error("Password is required");
        this.data.password = pass;
        
        return {
            profilePic: this.profilePic.bind(this),
            build: this.build.bind(this)
        };
    }

    // Step 4 (Optional): Returns the same object so they can chain or build
    profilePic(pic) {
        if (!pic) throw new Error("Pic is required");
        this.data.profilePic = pic;
        
        return {
            build: this.build.bind(this)
        };
    }

    build() {
        return new Formdata(this.data);
    }
}

const efficientForm = new EfficientRegistrationBuilder().username("vivek").email("vns@gmail.com").password("12344").build();
console.log(efficientForm)

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================
**Rating:** ⭐⭐⭐⭐⭐ (5/5)

**Code Review:** This is absolutely brilliant. Since JavaScript doesn't have 
TypeScript's compile-time interfaces, you did exactly the right thing: you 
chained specific classes together!

Because `UsernameStep` only has a `username()` method, if a developer tries to 
do `CreateForm.create().password()`, JavaScript will immediately throw a 
`TypeError: is not a function`. You have successfully forced developers to 
follow your exact sequence without relying on a compiler. 

You also handled the `OptionalSteps` perfectly by returning `this`, allowing them to 
either chain `.profilePic()` or just call `.build()` directly. This is textbook 
Step Builder pattern.

### 🧠 Deep Dive Questions
1. **Memory & Immutability:** Look closely at your transitions (e.g., 
`return new PasswordSteps({...this.data, emailId})`). At every single step, 
you are instantiating a brand new class instance and creating a brand new data 
object clone. While this is great for immutability, is it memory efficient 
if we had 50 steps? How could you achieve the exact same "Step" enforcement 
using just **one** single Builder class instance and returning plain 
JavaScript objects with bound methods (closures) instead of 
instantiating 4 different classes?

**Status:** ✅ Completed! Drop your answer below and let me know when you're ready for `builder_4`!
================================================================================

2. Solution for Deep Dive:
Here is how you can achieve the exact same Step Builder enforcement using a single 
class and closures. This saves memory because it only instantiates ONE builder 
and mutates ONE data object, rather than creating new objects at every step:

```javascript
class EfficientRegistrationBuilder {
    constructor() {
        this.data = {};
    }

    // Step 1: Returns an object that only has the 'email' method
    username(name) {
        if (!name) throw new Error("Name is required");
        this.data.username = name;
        
        return {
            email: this.email.bind(this)
        };
    }

    // Step 2: Returns an object that only has the 'password' method
    email(emailId) {
        if (!emailId) throw new Error("Email is required");
        this.data.email = emailId;
        
        return {
            password: this.password.bind(this)
        };
    }

    // Step 3: Returns an object that has 'profilePic' AND 'build'
    password(pass) {
        if (!pass) throw new Error("Password is required");
        this.data.password = pass;
        
        return {
            profilePic: this.profilePic.bind(this),
            build: this.build.bind(this)
        };
    }

    // Step 4 (Optional): Returns the same object so they can chain or build
    profilePic(pic) {
        if (!pic) throw new Error("Pic is required");
        this.data.profilePic = pic;
        
        return {
            build: this.build.bind(this)
        };
    }

    build() {
        return new Formdata(this.data);
    }
}

// Client code looks exactly the same! 
// If they try to do .password() first, it fails because `EfficientRegistrationBuilder` 
// only exposes `username()` initially, and the returned objects strictly control the next steps.
// const efficientForm = new EfficientRegistrationBuilder().username("vivek").email("vns@gmail.com").password("12344").build();
```
*/
