/**
 **observer_1** (Stock Market Ticker): The Observer Pattern
 
 ### The Scenario (Interview Style)
 You are building the core engine for a high-frequency trading platform. 
 The core engine (the Subject) constantly receives live price updates for 
 thousands of different stocks (e.g., AAPL, GOOG, TSLA).
 
 Across your ecosystem, you have dozens of different client systems that care 
 about these price changes. For example, you have a `MobileApp` that sends push 
 notifications, and a `WebDashboard` that updates a live graph.
 
 If every client system wrote a `while(true)` loop to constantly ping the core 
 engine asking "Did the price change?", your servers would crash instantly from 
 the network spam. 
 
 Furthermore, a user on the Mobile App might only care about "AAPL", while the 
 Web Dashboard might care about "GOOG" and "TSLA".
 
 ### Your Task
 Use the **Observer Pattern** to architect a highly efficient, push-based 
 event system.
 
 1. Architect a **Subject** (the Stock Engine) that allows external objects to 
    subscribe and unsubscribe dynamically at runtime.
 2. Ensure that the Subject can accept incoming stock price updates, and when it 
    does, it should automatically push that data out to whoever cares.
 3. *Crucial Requirement:* Subscriptions shouldn't be global. An Observer should 
    be able to subscribe to a *specific* stock ticker (e.g., only "AAPL"), so 
    they aren't spammed with data they don't want.
 4. Architect at least two distinct **Observers** (e.g., `MobileApp` and 
    `WebDashboard`) that react differently when they receive data.
 
 Prove your architecture works by writing a client script that creates the Engine, 
 subscribes a Mobile App to AAPL, subscribes a Dashboard to GOOG, and then pushes 
 price updates to the engine to see who reacts!
 */

class IStockMarket {
    constructor(stockName, price) {
        this.stockName = stockName;
        this.price = price;
        this.observerList = [];
    }
    update(price) {
        throw new Error("Methods should be implemented")
    }
    notifyObservers() {
        throw new Error("Methods should be implemented")

    }
    addObserver(observerName) {
        throw new Error("Methods should be implemented")

    }

}

class IStockObserver {
    constructor(name) {
        this.name = name;
    }
    update(price, stockName) {
        throw new Error("Methods should be implemented")
    }
}
class StockMarket extends IStockMarket {
    static observerList = new Map();
    constructor(price) {
        super();
        this.price = price;
    }
    update(price, stockName) {
        this.price = price;
        this.notifyObservers(stockName);
    }
    notifyObservers(stockName) {
        let stockSubscriber = StockMarket.observerList.get(stockName);
        for (const observer of stockSubscriber) {

            observer.update(this.price, stockName);
        }

    }
    addObserver(observerName, stockName) {
        console.log("Adding observer...")
        let list = StockMarket.observerList.get(stockName) || []
        list.push(observerName)
        StockMarket.observerList.set(stockName, list);
    }

}
class StockObserver extends IStockObserver {
    constructor(name) {
        super();
        this.name = name;
    }
    update(price, stockName) {
        console.log("Stock price updated to", { price, name: this.name, stockName });
    }
}
const stockMarket = new StockMarket(100);
const mobileApp = new StockObserver("MobileApp");
const webDashboard = new StockObserver("WebDashboard");
stockMarket.addObserver(mobileApp, "AAPL");
stockMarket.addObserver(webDashboard, "SAP");
stockMarket.addObserver(webDashboard, "AAPL");
stockMarket.update(101, "AAPL");
stockMarket.update(102, 'SAP');

/*
 [Review] ⭐⭐⭐ 3/5
 
 **Reviewer Feedback:**
 - Great job correctly implementing the core Observer mechanics! You have a 
  Subject that maintains a list of Observers, and a `notifyObservers()` method 
  that loops through and pushes data to them.
 - You successfully moved from a "Pull" architecture to an efficient "Push" 
   architecture!
 - *Missed Requirement:* The prompt asked you to build a central core engine 
 (`StockMarket`) that receives updates for *thousands* of different stocks, 
 and Observers should specify which specific stock they want to listen to 
 (e.g. "AAPL" vs "GOOG"). 
 Instead of building a central Engine with topic-based subscriptions, 
 you built a `StockMarket` class that represents a *single* stock. 
 If we had 5,000 stocks, we'd need 5,000 separate `StockMarket` subjects 
 floating around memory!
 
 **Cross-Pattern Question:**
 To fulfill the requirement of having ONE central Engine that routes updates 
 based on specific topics (like "AAPL"), you would need to upgrade this standard 
 Observer pattern into a slightly more advanced architectural pattern often 
 called **Pub-Sub (Publisher-Subscriber)** or an **Event Bus**.
 
 How would you modify your `observerList` data structure in the Subject to handle topic-based routing?
 */

/*
 [Review] ⭐⭐⭐⭐ 4/5
 
 **Reviewer Feedback:**
 - Great job successfully converting `observerList` to a Map (Dictionary)! This is the exact correct data structure for an Event Bus.
 - However, there is a logical flaw in how you route the data!
 
 Look at your client code: `stockMarket.update(101);`
 Which stock just updated to 101? Is it AAPL or SAP? 
 Because you don't pass the stock name into the `update` method, your `notifyObservers()` method literally loops through the ENTIRE map and sends the `101` price to EVERY SINGLE OBSERVER across all stocks!
 
 **Your Final Task:**
 To complete the Pub/Sub pattern:
 1. Change your update method to take the topic: `update(stockName, newPrice)`.
 2. Change `notifyObservers(stockName, newPrice)` so it *doesn't* loop over the entire Map. It should ONLY pull the specific array of observers for that specific stockName, and only loop over that one array!
 
 Once you fix that routing logic, you'll have a perfect Pub/Sub Engine!
 */
 
/*
 [Review] ⭐⭐⭐⭐⭐ 5/5
 
 **Final Reviewer Feedback:**
 - Perfect execution! You have successfully upgraded a standard Observer Pattern into a full **Event Bus (Pub/Sub Engine)**. 
 - By extracting the `stockName` into the `update()` call, and looking up that specific key in the Map, you guarantee `O(1)` routing! The AAPL subscribers get AAPL, the SAP subscribers get SAP, and you don't waste CPU cycles notifying people who don't care.
 
 Phenomenal job. This completes the Observer Pattern!
 */