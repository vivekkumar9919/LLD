/**
 * ==========================================
 * PRACTICE PROBLEM: Text Editor Undo System
 * ==========================================
 * 
 * ### The Scenario
 * You are building the core engine for a simple Text Editor. 
 * Users can perform two basic actions:
 * 1. Insert text (e.g., typing "Hello")
 * 2. Delete text (e.g., pressing backspace to delete the last 3 characters)
 * 
 * A critical feature for any text editor is the ability to undo mistakes. 
 * If a user types "Hello World", deletes "World", and then hits `CMD+Z` (Undo), 
 * the text editor should instantly restore the word "World". 
 * 
 * Furthermore, the user should be able to hit Undo *multiple times* to step 
 * backwards through their entire history of actions.
 * 
 * ### Your Task
 * Implement the Text Editor and the Undo functionality.
 * 
 * **Constraint:** You cannot just save a snapshot of the entire string after 
 * every single action (that would use too much memory for a large document). 
 * 
 * Use a Behavioral Design Pattern to encapsulate each action (insert/delete) as 
 * a standalone entity that knows how to execute itself, and more importantly, 
 * knows exactly how to *reverse* itself. 
 * 
 * Write a client script that:
 * 1. Inserts text
 * 2. Deletes text
 * 3. Calls `undo()` multiple times to prove the text state reverts perfectly.
 */


class TextEditior {
    constructor(text) {
        this.text = text;
    }
    insert(text) {
        this.text += text;
    }
    delete(text) {
        this.text = this.text.slice(0, this.text.length - text.length);
    }
}

class Command {
    constructor(textEditior) {
        this.textEditior = textEditior;
    }
    execute() { }
    undo() { }
}

class InsertCommand extends Command {
    constructor(textEditior, text) {
        super(textEditior);
        this.text = text;
    }
    execute() {
        this.textEditior.insert(this.text);
    }
    undo() {
        this.textEditior.delete(this.text);
    }
}

class DeleteCommand extends Command {
    constructor(textEditior, text) {
        super(textEditior);
        this.text = text;
    }
    execute() {
        this.textEditior.delete(this.text);
    }
    undo() {
        this.textEditior.insert(this.text);
    }
}

class CommandManager {
    constructor() {
        this.history = []
    }
    executeCommand(command) {
        command.execute();
        this.history.push(command)
    }
    undo() {
        if (this.history.length > 0) {
            this.history.pop().undo()
        }
    }
    // this is added just to check the history value
    getHistory() {
        console.log("History is ", this.history);
    }
}

const editor = new TextEditior("Hello");
const commandManager = new CommandManager();
commandManager.executeCommand(new InsertCommand(editor, "Hello"))
// commandManager.getHistory()
commandManager.executeCommand(new InsertCommand(editor, " World"))
// commandManager.getHistory()
commandManager.executeCommand(new DeleteCommand(editor, " Hello"))
// commandManager.getHistory()
commandManager.executeCommand(new DeleteCommand(editor, " World"))
commandManager.getHistory()
commandManager.undo()
commandManager.getHistory()
commandManager.undo()
commandManager.getHistory()

console.log(editor.text)

/*
================================================================================
📝 PRACTICE REVIEW: Command Pattern (command_1)
================================================================================

**Overall Rating: ⭐⭐⭐⭐ (4/5)**

You successfully created the Receiver (`TextEditor`), the Commands (`InsertCommand`, `DeleteCommand`), and the Invoker (`CommandManager`). You correctly decoupled the execution logic so that the Invoker only needs to know about `execute()` and `undo()`. 

You lost one star due to the initial flaw of pushing commands without executing them, and because your `TextEditor.delete(text)` method relies on string length slicing instead of index deletion, which could be risky for a real editor. 

However, this is still a solid implementation of the Command Pattern. You have successfully unlocked global undo/redo functionality!
*/
