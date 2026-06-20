/**
 (Abstract Factory): Implement a `CloudResourceFactory` that manages families of 
 related cloud services: `ComputeInstance` and `StorageBucket`. Provide concrete 
 implementations for `AWSFactory` and `GCPFactory`
 */

class ComputeInstance {
    start() {
        throw new Error("Methods should be implemented")
    }
}

class StorageBucket {
    upload() {
        throw new Error("Methods should be implemented")
    }
}

class EC2Instance extends ComputeInstance {
    start() {
        console.log("AWS ComputeInstance")
    }
}

class S3Bucket extends StorageBucket {
    upload() {
        console.log("AWS StorageBucket")
    }
}

class ComputeEngineInstance extends ComputeInstance {
    start() {
        console.log("GCP ComputeInstance")
    }
}
class CloudStorageBucket extends StorageBucket {
    upload() {
        console.log("GCP StorageBucket")
    }
}

class CloudResourceFactory {
    createComputeInstance() {
        throw new Error("Methods should be implemented")
    }
    createStorageBucket() {
        throw new Error("Methods should be implemented")
    }
}

class AWSFactory extends CloudResourceFactory {
    static instance = null;
    static getInstance() {
        if (!this.instance) {
            this.instance = new AWSFactory();
        }
        return this.instance;
    }
    createComputeInstance() {
        return new EC2Instance();
    }
    createStorageBucket() {
        return new S3Bucket();
    }
}

class GCPFactory extends CloudResourceFactory {
    static instance = null;
    static getInstance() {
        if (!this.instance) {
            this.instance = new GCPFactory();
        }
        return this.instance;
    }
    createComputeInstance() {
        return new ComputeEngineInstance();
    }
    createStorageBucket() {
        return new CloudStorageBucket();
    }
}

class CloudProvider {
    constructor(factory) {
        this.factory = factory;
    }
    services() {
        this.compute = this.factory.createComputeInstance();
        this.compute.start();
        this.storage = this.factory.createStorageBucket();
        this.storage.upload();
    }
}

const awsService = new CloudProvider(AWSFactory.getInstance());
awsService.services();

const gcpService = new CloudProvider(GCPFactory.getInstance());
gcpService.services();

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================
**Rating:** ⭐⭐⭐⭐⭐ (5/5)

**Code Review:** Absolutely flawless Abstract Factory implementation! You hit all the 
marks on the first try:
1. Abstract and Concrete Products are clearly separated.
2. The Abstract Factory interface is clean.
3. The Concrete Factories are implemented as Singletons to save memory.
4. The `CloudProvider` client is perfectly agnostic to the cloud vendor.

*Minor tip:* On line 38 inside `CloudStorageBucket`, you accidentally copy-pasted 
the log from S3 and it says "AWS StorageBucket" instead of "GCP StorageBucket". 
Just a tiny typo, but the architecture is 10/10!

### 🧠 Deep Dive Questions
1. **Cross-Pattern Context:** Look at the `createComputeInstance()` method inside 
your `AWSFactory` class. What design pattern is that *individual* method actually 
using? (Hint: Look at the relationship between Factory Method and Abstract Factory).

**Status:** ✅ Completed! Drop your answer below to complete the mental model, but I've already 
checked this off in your tracker!
================================================================================
1. The question is pointing out a really cool connection between the two patterns! 
An **Abstract Factory** is actually just an object that groups together 
multiple **Factory Methods**. 
Inside `AWSFactory`, the `createComputeInstance()` method on its own is an 
exact implementation of the **Factory Method** pattern. The Abstract Factory 
pattern simply takes several Factory Methods (`createComputeInstance`, `createStorageBucket`) 
and puts them inside a single class so that they are guaranteed to return 
compatible products (a "family").
*/
