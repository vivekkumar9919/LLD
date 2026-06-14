

class ModelTrainer {

    load(path) {
        console.log("[Common] Loading data from", path);
    }
    preprocessedData() {
        console.log("[Common] processing data");
    }
    trainModel() {
        throw new Error("Methods should be implemented")
    }
    evaluateModel() {
        throw new Error("Methods should be implemented")
    }
    saveModel() {
        console.log("[Common] saving data");
    }
    trainPipeline(path) {
        this.load(path);
        this.preprocessedData();
        this.trainModel();
        this.evaluateModel();
        this.saveModel();
    }
}

class NeuralNetwork extends ModelTrainer {
    trainModel() {
        console.log("[Neural Network] Training Model");
    }
    evaluateModel() {
        console.log("[Neural Network] Evaluating Model");
    }
    saveModel() {
        console.log("[Neural Network] saving data");
    }
}

class DecisionTreeTrainer extends ModelTrainer {
    trainModel() {
        console.log("[Decision Tree] Training Model");
    }
    evaluateModel() {
        console.log("[Decision Tree] Evaluating Model");
    }
}

const neuralNetworkModel = new NeuralNetwork();
const decisionTreeModel = new DecisionTreeTrainer();



neuralNetworkModel.trainPipeline("data/temp.csv");
console.log("----------------------------------")
decisionTreeModel.trainPipeline("data/temp.json");

/*
================================================================================
INTERROGATION QUESTIONS (Template Method Pattern)
================================================================================
1. On line 54, you directly invoke `decisionTreeModel.trainModel()`. Does exposing and 
   calling individual steps like `trainModel()` directly from the client code violate 
   the core philosophy of the Template Method pattern? Why or why not?

2. In `NeuralNetwork`, you overrode `saveModel()`, which already had a default 
   implementation in the base `ModelTrainer`. Is this a violation of the Liskov 
   Substitution Principle or the Template Method pattern? If not, what is this specific 
   technique called within the context of the Template Method?

3. Look at `trainPipeline`. You accidentally call `this.evaluateModel()` twice. But more 
   importantly, what if we wanted some algorithms (like a specific Deep Learning model) 
   to completely skip `preprocessedData()` because they expect raw data? How can you 
   design the Template Method base class to allow subclasses to optionally skip certain 
   steps without throwing errors or breaking the pipeline?

Please answer these questions directly below this comment block. Once you respond,
I will append the AI Evaluation of your answers.
================================================================================

1. Yes, it voilates the rule of Template method pattern because , this is not intended behavior 
   i am just testing something ,so removed that part.
2. No , this is not voliarions of Liskov substitution principle. This is called overriding.
   Because methods name is same , we are not chanining return type or parameter type 
   we can do this.
3. evaluateModel calles accendentaly so removed for now, we can use factory design 
   pattern where we can provide hooks and skip certain part 

--------------------------------------------------------------------------------
--- AI EVALUATION ---
--------------------------------------------------------------------------------
Score: 7/10

1. **Hollywood Principle (Passed):** Correctly identified that calling it directly violates the pattern. The key term to remember here for interviews is the "Hollywood Principle" ("Don't call us, we'll call you"). The base class template method should be the only entry point.
2. **LSP & Hooks (Partial):** Correct that it doesn't violate LSP. However, you missed the specific terminology! In the Template Method pattern, a method with a default or empty implementation in the base class that subclasses *can* override is called a **Hook**.
3. **Skipping Steps (Missed):** You don't need a Factory Design Pattern for this. To optionally skip steps, you use a boolean Hook method. 
   For example, in the base class:
   `requiresPreprocessing() { return true; }`
   Then in `trainPipeline()`: 
   `if (this.requiresPreprocessing()) { this.preprocessedData(); }`
   The subclass can then override `requiresPreprocessing()` to return `false`, elegantly skipping the step without breaking the pipeline.

================================================================================
*/