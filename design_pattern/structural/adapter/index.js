

class Report {
    getJSONData(data) {
        throw new Error("Method getJSONData must be implemented");
    }
}

class XMLDataProvider {
    getXMLData(data) {
        // simulate XML conversion
        return `<data>${data}</data>`;
    }
}

class XMLDataProviderAdapter extends Report {
    constructor(xmlProvider) {
        super();
        this.xmlProvider = xmlProvider;
    }

    getJSONData(data) {

        // Step 1: Get XML data
        const xmlData = this.xmlProvider.getXMLData(data);

        // Step 2: Convert XML -> JSON
        // (mock conversion)
        const jsonData = {
            data: xmlData
        };

        return jsonData;
    }
}

const xmlProvider = new XMLDataProvider();

const report = new XMLDataProviderAdapter(xmlProvider);

const ans = report.getJSONData("hello");

console.log(ans);

/*
=========================================
INTERVIEW FOLLOW-UP QUESTIONS & ANSWERS
=========================================
Q1: How would you implement a Class Adapter in JS, and why is the Object Adapter preferred?
A1: A Class Adapter requires multiple inheritance (inheriting both XMLDataProvider and Report), which JS does not natively support. Object Adapter (composition) is preferred because it avoids inheritance limitations and tightly-coupled hierarchies.

Q2: Since JS doesn't have strict static typing, what happens if you delete `extends Report` and `super()` entirely?
A2: Because JS uses "duck typing", it would actually still work perfectly. As long as the class implements a `getJSONData` method, the client doesn't care if it formally extends `Report`. (Though `extends` is good for documentation/LSP).

Q3: If getXMLData takes 5 seconds, how does your current Adapter handle it?
A3: Since JS is single-threaded, a synchronous 5-second call would freeze the system. To fix this, the Adapter and Provider methods should be converted to `async/await` so the event loop can handle the latency without blocking.
*/

/** 
1. Class vs Object Adapter: Exactly right. Because JavaScript lacks multiple inheritance, implementing a true Class Adapter is messy (you would have to rely on mixins). The Object Adapter (composition) is vastly superior and standard practice.
2. Duck Typing (Trick Question): You are correct that calling super() is required if you use extends. However, the trick is that you don't even need extends Report in the first place! Because JavaScript uses "Duck Typing" (if it walks like a duck and quacks like a duck, it's a duck), as long as your XMLDataProviderAdapter has a getJSONData method, the client code will accept it perfectly. (That said, keeping extends Report is still great for documentation and making your codebase easier to read for Java/C++ devs).
3. Async / Single Threading: Perfect answer. A synchronous API call would block the main thread and freeze the Node.js event loop. In a real-world scenario, your Adapter methods must be async, returning Promises to handle the I/O non-blockingly. 

*/