

class ISubscriber {
    update() {
        throw new Error("No Implementation")
    }
}

class IChannels {
    subscribe() {
        throw new Error("No Implementation")
    }
    unsubscribe() {
        throw new Error("No Implementation")
    }
    notifySubscriber() {
        throw new Error("No Implementation")
    }

}

class Channels extends IChannels {
    constructor(name) {
        super();
        this.subscribers = []
        this.name = name;
        this.latestVideo = "";
    }
    subscribe(subscriberName) {
        if (this.subscribers.includes(subscriberName)) {
            console.log("You have already subscribed");
        }
        else {
            this.subscribers.push(subscriberName);
            console.log("You have successfully Subscribed")
        }
    }
    unsubscribe(subscriberName) {
        if (this.subscribers.includes(subscriberName)) {
            this.subscribers = this.subscribers.filter(item => item != subscriberName);
            console.log("You have successfully unsubscribed");
        }
        else {
            console.log("No subscriber found")
        }
    }
    notifySubscriber() {
        for (let i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i].update();
        }
    }
    uploadVideo(title) {
        this.latestVideo = title;
        console.log("Video uploaded")
    }
    getVideoData() {
        return "Checkout our new video on " + this.latestVideo;
    }
}


class Subscriber extends ISubscriber {
    constructor(name, channels) {
        super();
        this.name = name;
        this.channels = channels;
    }
    update() {
        console.log("Hey " + this.name + " " + this.channels.getVideoData());
    }
}

const channels = new Channels("Design");

const sub1 = new Subscriber("Vivek", channels);
const sub2 = new Subscriber("Akhil", channels);

channels.subscribe(sub1);
channels.subscribe(sub2);

channels.uploadVideo("Observer pattern")
channels.notifySubscriber();
channels.unsubscribe(sub2)
console.log("After Unsubscribe -------")
channels.notifySubscriber();

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
*/
