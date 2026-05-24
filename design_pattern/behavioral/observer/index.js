

class ISubscriber {
    update(channel) {
        throw new Error("No Implementation");
    }
}

class IChannels {
    subscribe() {
        throw new Error("No Implementation");
    }
    unsubscribe() {
        throw new Error("No Implementation");
    }
    notifySubscriber() {
        throw new Error("No Implementation");
    }
}

class Channels extends IChannels {
    constructor(name) {
        super();
        this.subscribers = [];
        this.name = name;
        this.latestVideo = "";
    }
    subscribe(subscriber) {
        if (this.subscribers.includes(subscriber)) {
            console.log("Already subscribed");
        } 
        else {
            this.subscribers.push(subscriber);
            console.log(
                `${subscriber.name} subscribed to ${this.name}`
            );
        }
    }

    unsubscribe(subscriber) {

        this.subscribers =
            this.subscribers.filter(
                item => item !== subscriber
            );
    }

    notifySubscriber() {

        for (const subscriber of this.subscribers) {

            subscriber.update(this);
        }
    }

    uploadVideo(title) {

        this.latestVideo = title;

        console.log(
            `New video uploaded on ${this.name}`
        );

        this.notifySubscriber();
    }

    getVideoData() {

        return `Checkout new video "${this.latestVideo}"`;
    }
}

class Subscriber extends ISubscriber {

    constructor(name) {
        super();

        this.name = name;
    }

    update(channel) {

        console.log(
            `Hey ${this.name},
             ${channel.name} uploaded:
             ${channel.getVideoData()}`
        );
    }
}

const channels = new Channels("Design");
const channels2 = new Channels("Design 2");

const sub1 = new Subscriber("Vivek", channels);
const sub2 = new Subscriber("Akhil", channels);

channels.subscribe(sub1);
channels.subscribe(sub2);
channels2.subscribe(sub1);

channels.uploadVideo("Observer pattern")
channels2.uploadVideo("Observer pattern 2")
// channels.unsubscribe(sub2)
// channels.uploadVideo("Observer pattern 2")



/*
=========================================
INTERROGATION QUESTIONS (Observer LLD)
=========================================
1. Coupling Trade-offs (Push vs. Pull Model):
   In your implementation, the `Subscriber` takes a concrete `channels` instance in its constructor and pulls the data using `this.channels.getVideoData()`.
   - What happens if a `Subscriber` wants to subscribe to multiple different channels? How does your current design limit this?
   - How would you refactor this to support subscribing to multiple channels? Compare the Push Model (passing data via parameters) vs. the Pull Model (passing the subject instance via parameters).

2. Event Encapsulation:
   Currently, the client has to manually call `channels.uploadVideo(...)` and then separately call `channels.notifySubscriber()`.
   - Why is this manual notification triggering dangerous in a production environment?
   - Where should `notifySubscriber()` be called to preserve encapsulation?

---Vivek Answer---
1. Current design does not support subscribing to multiple channels. 
2. manual notify is dangerous in production environment if new video uploaded then cliets need to wait
   for upload then call then notify if missed then notifcation to subscribers get missed
   notifySubscriber should be called in uploadVideo method to preserve encapsulation.

--- AI EVALUATION ---
1. Coupling Trade-offs (Push vs. Pull Model):
   - What is Right: You correctly identified the multi-channel limitation and successfully refactored the codebase to use the **Pull Model** (passing `this` to `update(channel)`), which completely decoupled `Subscriber` instantiation from a single subject.
   - What is Wrong: You didn't write out the explicit theoretical comparison between the Push and Pull models.
   - What is Missing: A brief comparison:
     * *Push Model:* Subject sends raw data (e.g. `update(videoData)`). Pros: Observer is 100% decoupled from the Subject class. Cons: Observers only get what they are sent.
     * *Pull Model:* Subject sends itself (e.g. `update(this)`). Pros: Observers query exactly what they need. Cons: Observers are coupled to the Subject's public API/interface.

2. Event Encapsulation:
   - What is Right: You accurately detailed the hazard of manual notifications in production (reliability issues, timing issues, developers forgetting to trigger notifications). You correctly moved `this.notifySubscriber()` to run automatically inside `uploadVideo()`.
   - What is Wrong: Nothing.
   - What is Missing: None.
*/
