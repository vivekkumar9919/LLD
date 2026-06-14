class FileSystemVisitor {
    visitTextFile(textFile) { }
    visitImgFile(imgFile) { }
    visitVideoFile(videoFile) { }
}

class FileSystemItem {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    accept(visitor) {
        throw new Error("accept() must be implemented");
    }
}

class TextFile extends FileSystemItem {
    constructor(fileName, content) {
        super(fileName);
        this.content = content;
    }

    getContent() {
        return this.content;
    }

    accept(visitor) {
        visitor.visitTextFile(this);
    }
}

class ImgFile extends FileSystemItem {
    constructor(fileName) {
        super(fileName);
    }

    accept(visitor) {
        visitor.visitImgFile(this);
    }
}

class VideoFile extends FileSystemItem {
    constructor(fileName) {
        super(fileName);
    }

    accept(visitor) {
        visitor.visitVideoFile(this);
    }
}

// Size Calculation Visitor

class SizeCalculationVisitor extends FileSystemVisitor {
    visitTextFile(textFile) {
        console.log(
            "Calculating size for text file:",
            textFile.getName()
        );
    }

    visitImgFile(imgFile) {
        console.log(
            "Calculating size for image file:",
            imgFile.getName()
        );
    }

    visitVideoFile(videoFile) {
        console.log(
            "Calculating size for video file:",
            videoFile.getName()
        );
    }
}

// Compression Visitor

class CompressionVisitor extends FileSystemVisitor {
    visitTextFile(textFile) {
        console.log(
            "Compressing text file:",
            textFile.getName()
        );
    }

    visitImgFile(imgFile) {
        console.log(
            "Compressing image file:",
            imgFile.getName()
        );
    }

    visitVideoFile(videoFile) {
        console.log(
            "Compressing video file:",
            videoFile.getName()
        );
    }
}

// Virus Scanning Visitor

class VirusScanningVisitor extends FileSystemVisitor {
    visitTextFile(textFile) {
        console.log(
            "Scanning text file for viruses:",
            textFile.getName()
        );
    }

    visitImgFile(imgFile) {
        console.log(
            "Scanning image file for viruses:",
            imgFile.getName()
        );
    }

    visitVideoFile(videoFile) {
        console.log(
            "Scanning video file for viruses:",
            videoFile.getName()
        );
    }
}

// Client

const files = [
    new TextFile("notes.txt", "Hello World"),
    new ImgFile("photo.jpg"),
    new VideoFile("movie.mp4")
];

const sizeVisitor = new SizeCalculationVisitor();
const compressionVisitor = new CompressionVisitor();
const virusVisitor = new VirusScanningVisitor();

console.log("=== Size Calculation ===");
files.forEach(file => file.accept(sizeVisitor));

console.log("\n=== Compression ===");
files.forEach(file => file.accept(compressionVisitor));

console.log("\n=== Virus Scan ===");
files.forEach(file => file.accept(virusVisitor));

/*
================================================================================
INTERROGATION QUESTIONS (Visitor Pattern)
================================================================================
1. The Visitor pattern allows adding new operations (like `VirusScanningVisitor`) 
   without changing the `FileSystemItem` classes. But what happens if you need to 
   add a completely new element type, like `AudioFile`? How does this impact the 
   existing codebase, and does it violate the Open-Closed Principle?

2. In Javascript, we don't have static method overloading based on parameter types 
   like in Java or C++. Because of this, we named the methods `visitTextFile`, 
   `visitImgFile`, etc. If we simply used a single `visit(file)` method in the 
   visitor and used an `if (file instanceof TextFile)` check inside it instead of 
   `accept(visitor)`, would that still be considered the standard Visitor Pattern? 
   Why or why not? What mechanism are we trying to simulate here?

3. Currently, your visitors only print `console.log` statements. If 
   `SizeCalculationVisitor` needed to calculate and return the *total* combined size 
   of all files it visited, how would you design the visitor to accumulate and 
   return this state without modifying any of the `FileSystemItem` classes?

Please answer these questions directly below this comment block. Once you respond,
I will append the AI Evaluation of your answers.
================================================================================

1. this visitor methods suitabl when we need to add new operations more frequently 
   on exiting and fixed number of classes like in this case we have text , img , video
   but if we need to add new class here for audio then we need to change in every 
   visitor subclass like SizeCalculationVisitor etc, for additon for audio 
   first we need to add new element in FileSystemVisitor and then after in every 
   visitor class we need to add visitAudioFile this will not requried any change in 
   FileSystemItem class.
2. Like in java and cpp where we have methods overloading based on parameter type
   in js we dont have that we can use instanceof operator to check the type
   but this is not the Visitor Pattern because instanceof operator is not 
   dynamic dispatch. Visitor pattern is all about dispatching the method 
   dynamically based on the type of the object
3. Currenlty in SizeCalculationVisitor we are simulating the beahvior of size 
    calculations not acutaly caulating the size , to calcualate the size we just need 
    proper businses logic to implement in Visitor class.

--------------------------------------------------------------------------------
--- AI EVALUATION ---
--------------------------------------------------------------------------------
Score: 8/10

1. **Tradeoffs (Passed):** Excellent. You correctly identified the 
    Achilles' heel of the Visitor Pattern. It assumes the Element hierarchy 
    is stable. Adding a new element (like AudioFile) forces you to modify 
    every single visitor, which violates the Open-Closed Principle.
2. **Double Dispatch (Passed):** Spot on. The `instanceof` check is a 
    type-checking hack, not Double Dispatch. The Visitor pattern relies on 
    polymorphism (`accept` routing to the specific visitor method).
3. **State Accumulation (Missed):** You missed the implementation detail. 
     The question asked *how* you would design it. The answer is: you give 
     the Visitor internal state. For example, `SizeCalculationVisitor` gets 
     a `this.totalSize = 0` in its constructor. Each `visit()` method adds 
     to it. Finally, you add a `getTotalSize()` method on the visitor to get 
     the final state after the `forEach` loop completes. Visitors are 
     powerful because they can accumulate state across disparate objects!

================================================================================
*/