
class IMediator {

    resisterColleague(colleague) {
        throw new Error("Must implement");
    }

    send(from, msg) {
        throw new Error("Must implement");
    }

    sendPrivate(from, to, msg) {
        throw new Error("Must implement");
    }
}

class Colleague {

    constructor(name, mediator) {
        this.name = name;
        this.mediator = mediator;

        this.mediator.resisterColleague(this);
    }

    getName() {
        return this.name;
    }

    send(msg) {
        this.mediator.send(this, msg);
    }

    sendPrivate(to, msg) {
        this.mediator.sendPrivate(this, to, msg);
    }

    receive(from, msg) {
        console.log(
            `${this.name} received from ${from}: ${msg}`
        );
    }
}

class ChatMediator extends IMediator {

    constructor() {
        super();

        this.colleagues = [];
        this.mutes = new Map();
    }

    resisterColleague(colleague) {

        this.colleagues.push(colleague);

        this.mutes.set(
            colleague.getName(),
            new Set()
        );
    }

    send(from, msg) {

        for (const colleague of this.colleagues) {

            if (colleague === from) {
                continue;
            }

            const mutedUsers =
                this.mutes.get(colleague.getName());

            if (
                mutedUsers.has(from.getName())
            ) {
                continue;
            }

            colleague.receive(
                from.getName(),
                msg
            );
        }
    }

    sendPrivate(from, to, msg) {

        const target =
            this.colleagues.find(
                c => c.getName() === to
            );

        if (!target) {

            console.log(
                `User ${to} not found`
            );

            return;
        }

        const mutedUsers =
            this.mutes.get(target.getName());

        if (
            mutedUsers.has(from.getName())
        ) {

            console.log(
                `${from.getName()} is muted by ${to}`
            );

            return;
        }

        target.receive(
            from.getName(),
            `[Private] ${msg}`
        );
    }

    mute(userName, muteUserName) {

        const mutedUsers =
            this.mutes.get(userName);

        mutedUsers.add(muteUserName);
    }

    unmute(userName, muteUserName) {

        const mutedUsers =
            this.mutes.get(userName);

        mutedUsers.delete(muteUserName);
    }
}

class User extends Colleague {

    constructor(name, mediator) {
        super(name, mediator);
    }
}

const mediator = new ChatMediator();

const vivek =
    new User("Vivek", mediator);

const akhil =
    new User("Akhil", mediator);

const rohit =
    new User("Rohit", mediator);

vivek.send("Hello Everyone");

akhil.sendPrivate(
    "Vivek",
    "Can we discuss Kafka?"
);

mediator.mute(
    "Rohit",
    "Vivek"
);

vivek.send("New system design video");

/*
================================================================================
INTERROGATION QUESTIONS (Mediator Pattern)
================================================================================
1. Why does the Colleague class register itself with the mediator inside its constructor?
   Doesn't this violate Dependency Inversion and the Single Responsibility Principle by
   forcing the Colleague to have direct knowledge of how and when registration happens,
   rather than leaving registration/orchestration entirely to the client or the mediator?

2. In sendPrivate, you are performing a linear search (find()) over this.colleagues
   every time a private message is sent, giving it O(N) complexity. For a large-scale
   chat system with thousands of active users, this is highly inefficient.
   How would you refactor ChatMediator to improve lookup efficiency to O(1) while keeping
   the code clean? What tradeoffs does your proposed structure introduce?

3. In ChatMediator, the methods mute(userName, muteUserName) and unmute(userName, muteUserName)
   exist, but they are NOT part of the IMediator interface. Yet, the client interacts
   directly with mediator.mute(...) on the concrete class.
   Does this violate the Dependency Inversion Principle (DIP)? Why or why not?
   If you wanted to allow a Colleague to mute another colleague directly (e.g., vivek.mute("Akhil")),
   how would you design the interfaces to support this without violating DIP or leaking
   mediator implementation details?

Please answer these questions directly below this comment block. Once you respond,
I will append the AI Evaluation of your answers.
================================================================================
1. In the provided mediator example, the Colleague class registers itself with the mediator inside its constructor. 
2. We can use map there and tradeoff will be the extra space 
3. NA

--------------------------------------------------------------------------------
--- AI EVALUATION ---
--------------------------------------------------------------------------------
### Question 1: Constructor Registration Coupling
* **What is right:** None.
* **What is wrong:** The response simply restates the fact that registration happens in the constructor but fails to address the SRP/DIP critique or defend the design choice.
* **What is missing:** In a real interview, you must explain that registering in the constructor forces `Colleague` to know the mediator's registration lifecycle, creating a tight bi-directional coupling. You should defend it by stating it prevents colleagues from existing in an invalid "unregistered" state, OR propose an alternative where registration is handled by the client/orchestrator (e.g., `mediator.register(colleague)`) after object construction to keep the constructor clean and respect single responsibility.

### Question 2: O(1) Lookup Optimization
* **What is right:** Correctly identifies that a `Map` is the right data structure to achieve O(1) lookup and that the tradeoff is extra space.
* **What is wrong:** The answer is too brief to show engineering depth.
* **What is missing:** It doesn't specify what the Map keys and values would be (e.g., mapping `name -> Colleague`). It also doesn't discuss the cleanup benefits: if we use a Map, we can completely eliminate the `colleagues` array and broadcast using `Map.prototype.values()`, keeping our state synchronized without maintaining duplicate collections.

### Question 3: Interface Leakage and DIP
* **What is right:** None.
* **What is wrong:** Marked as "NA". This is a critical question about Dependency Inversion and Interface Design in LLD interviews.
* **What is missing:** Calling `mute` directly on the concrete `ChatMediator` violates DIP since the client depends on the concrete class instead of the `IMediator` interface. To fix this, `IMediator` should define `mute(userName, muteUserName)` and `unmute(...)`. To allow a `Colleague` to mute directly, `Colleague` should expose a `mute(targetName)` method that delegates the call to `this.mediator.mute(this.name, targetName)`. This encapsulates the mediator's mechanics and preserves abstraction.
--------------------------------------------------------------------------------
*/