/**
 **facade_1** (Video Converter): Hiding Subsystem Complexity
 
 ### The Scenario (Interview Style)
 You are building a web app that lets users upload video files and convert them to 
 other formats. However, video conversion is a highly complex subsystem. 
 To convert a video today, your UI developers have to write all this code:
 
 ```javascript
 // A UI Developer trying to convert a video...
 const file = new VideoFile("funny-cats.mp4");
 const sourceCodec = CodecFactory.extract(file);
 const destinationCodec = new OggCompressionCodec();
 const buffer = BitrateReader.read(file, sourceCodec);
 const audioFixed = AudioMixer.fix(buffer);
 const result = BitrateReader.convert(audioFixed, destinationCodec);
 // ... this is way too much backend logic bleeding into the UI layer!
 ```
 
 ### Your Task
 Implement the **Facade Pattern** to hide this complex subsystem behind a simple API.
 
 1. Create the dummy subsystem classes (`VideoFile`, `CodecFactory`, `OggCompressionCodec`, 
    `BitrateReader`, and `AudioMixer`). They don't need real logic, just simple 
    methods that return strings or `console.log()` what they are doing.
 2. Create a `VideoConversionFacade` class. It should expose a single, easy-to-use 
    method: `.convertVideo(filename, format)`.
 3. The Facade method should internally instantiate and coordinate all the complex 
    subsystem classes in the exact order shown above, and then return a final message.
 
 Prove it works by writing clean client code that ONLY interacts with the Facade:
 ```javascript
 const converter = new VideoConversionFacade();
 converter.convertVideo("funny-cats.mp4", "ogg");
 ```
 */

class VideoFile {
    constructor(path, format) {
        this.path = path;
        this.format = format;
    }
    getFileName() {
        console.log("File name is", `user/download/video/${this.path}`);
        console.log(this.path, this.format);
        return `user/download/video/${this.path}`
    }

}

class CodecFactory {
    static extract(videFile) {
        // logic to extract source code for video file 
        console.log("Source code for ", videFile.getFileName());
        return "compressed_file_path"
    }

}
class OggCompressionCodec {
    compress() {
        // logic to compress file
        console.log("compressing the video file");
        const dynamicPath = "file1"
        return `user/compress/${dynamicPath}`
    }
}

class BitrateReader {
    static read(file, sourceCodec) {
        console.log(`Reading ${file.getFileName()} from ${sourceCodec}`);
        return "buffer_data";
    }
    static convert(audioFixed, destinationCodec) {
        console.log("final result for the ", { audioFixed, destinationCodec: destinationCodec.compress() })
    }
}

class AudioMixer {
    fix(buffer) {
        console.log("Fixing buffer for", buffer);
        return "Fixed_file_path";
    }
}

class VideoConversionFacade {
    constructor(VideoFileClass = VideoFile, codecFactory = CodecFactory, oggCompressionCodec = new OggCompressionCodec(), bitrateReader = BitrateReader, audioMixer = new AudioMixer()) {
        this.VideoFileClass = VideoFileClass;
        this.codecFactory = codecFactory;
        this.oggCompressionCodec = oggCompressionCodec;
        this.bitrateReader = bitrateReader;
        this.audioMixer = audioMixer;
    }
    convertVideo(filename, format) {
        const file = new this.VideoFileClass(filename, format);
        const sourceCodec = this.codecFactory.extract(file);
        const destinationCodec = this.oggCompressionCodec;
        const buffer = this.bitrateReader.read(file, sourceCodec);
        const audioFixed = this.audioMixer.fix(buffer);
        const result = this.bitrateReader.convert(audioFixed, destinationCodec);
    }
}

// we can directly create class object inside the convertVideo but its not a write way because for testing (unit testing)
// we can not mock these services so testing will be a difficult here so write way to send object in constructor so that 
// for testing we can send the mock services and easy way to test 
// here i am sending a single-single parameter where we can send a object which is light weight and easy to maintain here 
// it create a some coupling at clients side like class inaliaztion but it also hide the 
// complexity at user side in what order these classes are called and which methods are 
// used and we can create a one wrapper of VideoConversionFacade class for simple clients


// const file = new VideoFile("funny-cats.mp4", "video");
// const sourceCodec = CodecFactory;
// const destinationCodec = new OggCompressionCodec();
// const buffer = BitrateReader;
// const audioFixed = new AudioMixer();


const video = new VideoConversionFacade().convertVideo("funny-cats.mp4", "ogg");

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK (Interview Discussion)
================================================================================

### 🧠 Deep Dive: Your Follow-Up Question
You asked: *"What if my class takes some constructor value? How can I use them in default like VideoFile('funny-cats.mp4')?"*

This is a fantastic question. The answer lies in the difference between **Services** and **Entities (Data Objects)**.

1. **Services** (`AudioMixer`, `OggCompressionCodec`, `BitrateReader`): 
These are stateless workers. They don't care about the filename when they are created. You **should** inject these in the constructor!

2. **Entities/Data Objects** (`VideoFile`): 
These hold state (`filename`, `format`). You don't know the filename when you boot up the app and create the Facade. You only know the filename *later* when the user actually clicks "Upload". 

Because `VideoFile` requires runtime data, you generally **do not inject it** into the constructor. You just instantiate it normally inside the method!

```javascript
class VideoConversionFacade {
    // 1. Inject SERVICES (stateless workers)
    constructor(audioMixer = new AudioMixer(), oggCodec = new OggCompressionCodec()) {
        this.audioMixer = audioMixer;
        this.oggCodec = oggCodec;
    }

    // 2. Pass DATA/ENTITIES into the method at runtime
    convertVideo(filename, format) {
        // Instantiate data objects locally! No need to mock this in tests.
        const file = new VideoFile(filename, format); 
        
        // Use your injected services to do the work
        const buffer = BitrateReader.read(file, "codec");
        this.audioMixer.fix(buffer);
    }
}
```

*Note: If you were incredibly strict and absolutely HAD to mock `VideoFile`, 
you wouldn't inject the instance, you would inject the **Class reference** 
(or a factory), like this:*
`constructor(VideoFileClass = VideoFile)`
*and then inside the method:*
`const file = new this.VideoFileClass(filename, format);`

But 99% of the time, we don't inject data objects, only services!

**Next Steps:** Update your code to only inject the **Services** into the constructor, and let `convertVideo(filename, format)` instantiate the `VideoFile` locally. Ping me when you're ready for the final review!
================================================================================
*/

/*
--------------------------------------------------------------------------------
🏆 FINAL EVALUATION
--------------------------------------------------------------------------------
**Rating:** ⭐⭐⭐⭐⭐ (5/5)

**Code Review:** Brilliant! You perfectly blended the two architectural concepts 
together.

1. **Dependency Injection:** By setting up the constructor with default parameters, 
your Facade is 100% testable. A unit test can pass in a mock `AudioMixer` and even a 
mock `VideoFileClass` reference to verify behavior without hitting the real 
filesystem.
2. **The Facade Pattern:** Because you used default parameters, the normal UI 
Client doesn't have to pass *anything* in! They just call 
`new VideoConversionFacade().convertVideo("funny-cats.mp4", "ogg")`. 
The client is blissfully unaware of the 5 complex subsystem classes working behind 
the scenes.

This is exactly how enterprise-grade Facades are built in production JavaScript 
applications!

**Status:** ✅ Completed! 
================================================================================
*/


