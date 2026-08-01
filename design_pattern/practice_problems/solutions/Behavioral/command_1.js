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

const editor = new TextEditior("Hello");

const history = [];

history.push(new InsertCommand(editor, "Hello"));
history.push(new InsertCommand(editor, " World"));
history.push(new DeleteCommand(editor, "Hello"));
history.push(new DeleteCommand(editor, " World"));

console.log(history);


