# Real-World Interview Problems

Welcome to the **Real-World Interview Simulations**. 
In these problems, you will not be told which Design Pattern to use. Just like in a real system design interview, you will be given a messy business scenario. It is your job to:
1. Identify the architectural bottlenecks in the naive approach.
2. Propose the correct Design Pattern(s) to solve it.
3. Defend your choice.
4. Implement the solution.

*Note: Some problems might require a pattern you have already studied, and others might introduce a pattern you haven't seen yet!*

---

## The Problems

- ✅ **Problem 1: The Multi-Channel Notification System**
  - **Scenario:** Our SaaS platform needs to send alerts. Currently, we support Email and SMS. Users can opt-in to multiple types (e.g., they want Email AND SMS for critical alerts). Next month we are adding Slack and WhatsApp.
  - **Challenge:** Architect a system that allows stacking multiple notification types dynamically without creating a massive class explosion (e.g., you should not have to write a `EmailAndSMSAndSlackNotifier` class).

- ✅ **Problem 2: The E-Commerce Payment Switcher**
  - **Scenario:** You are building a checkout system. Currently, the `CheckoutProcessor` has a massive `if/else` block inside it to switch between Stripe, PayPal, and Apple Pay processing logic. 
  - **Challenge:** Architect the checkout flow so that the core `CheckoutProcessor` is entirely decoupled from the payment methods. You should be able to add 10 new payment methods tomorrow without ever touching the `CheckoutProcessor` class again.

- ✅ **Problem 3: The Global App Configuration**
  - **Scenario:** Your backend Node.js application has a `ConfigManager` that reads settings from a heavy `.env` file (like Database URLs, API keys). Right now, every service in the app (AuthService, ProductService, BillingService) creates `new ConfigManager()` when it needs a setting, meaning it reads the file from the hard drive dozens of times per request.
  - **Challenge:** Architect this so the `ConfigManager` is only created exactly once, and every file shares the exact same instance in memory, guaranteeing the file is only read from the disk one time.

- [ ] **Problem 4: The UI Theme Enforcer**
  - **Scenario:** You are building a frontend dashboard UI Library. It supports a "Light" theme and a "Dark" theme. The UI consists of Buttons, Modals, and Navbars. Whenever a theme is selected, all UI components must be rendered in that specific style. 
  - **Challenge:** If a developer chooses "Dark Mode", ensure that the system guarantees *only* Dark Buttons and Dark Modals are created. Make it impossible for a developer to accidentally mix a "Light" Button inside a "Dark" Modal.

- [ ] **Problem 5: The Incompatible Analytics API**
  - **Scenario:** Your company has been tracking user clicks using an internal class called `LegacyAnalytics` that has a method `sendData(xmlString)`. You just signed a contract with a fancy new vendor, "Mixpanel". But the `MixpanelAPI` only accepts JSON via a method called `trackEvent(jsonObj)`.
  - **Challenge:** Architect a layer so that your existing application code (which calls `sendData(xmlString)`) can remain completely untouched, while successfully routing the data into the new Mixpanel API.

- ✅ **Problem 6: The Parking Lot Management System**
  - **Scenario:** You are tasked with designing a fully functional Parking Lot system. The parking lot has multiple floors and different types of parking spots (Compact, Large, Motorcycle, Handicapped). Different vehicles (Car, Truck, Motorcycle) have different requirements. There are entry terminals and exit terminals. The system must issue a ticket at entry and calculate the fee at exit.
  - **Challenge:** Architect the classes and relationships for this system. Apply appropriate Design Patterns (e.g. Strategy for fee calculation, Observer for full-capacity display boards). Your design must be scalable and adhere to SOLID principles.

- [ ] **Problem 7: The Meeting Room Scheduler (Calendar)**
  - **Scenario:** You have multiple meeting rooms in an office. Users can book a room for specific time slots (e.g., 2:00 PM to 3:00 PM). 
  - **Challenge:** Design the `MeetingRoom` and `Calendar` classes to maintain their own schedule. You must implement the logic to check for overlaps and reject conflicting bookings without using a database query.

- [ ] **Problem 8: The Movie Theater Booking System**
  - **Scenario:** Users want to book specific seats (e.g., A1, A2) for a specific movie showing. When a user selects a seat, it is "Held" for 5 minutes. If they don't pay in 5 minutes, it becomes available again.
  - **Challenge:** Manage the state of hundreds of `Seat` objects entirely in memory. Implement the "Hold" logic using pure OOP state management, ensuring two users cannot double-book the same seat.

- [ ] **Problem 9: The LRU Cache**
  - **Scenario:** Your web server is too slow, so you need to build an In-Memory Cache that holds a maximum of 100 items. When the cache is full, you must evict the Least Recently Used item.
  - **Challenge:** This is the ultimate "No Databases Allowed" problem. You must combine a Hash Map and a Doubly Linked List of Node objects to manage state and eviction logic in $O(1)$ time.

- [ ] **Problem 10: The E-Commerce Inventory Manager**
  - **Scenario:** You are selling a limited-edition sneaker. You only have 100 pairs. Thousands of users are trying to buy them. When a user adds the sneaker to their cart, that specific pair is reserved for 15 minutes.
  - **Challenge:** Design the `Inventory` and `Cart` classes to manage these temporary reservations in memory. If the user doesn't checkout in 15 minutes, the stock must be returned to the global pool.

- [ ] **Problem 11: The Ride-Sharing Dispatcher (Uber)**
  - **Scenario:** You need to match riders with drivers. Drivers constantly report their location (X,Y coordinates) and status (Available, En Route, On Trip). 
  - **Challenge:** Design the `Driver` objects to maintain their own state. Build a `Dispatcher` that can iterate through in-memory objects to find the nearest *Available* driver and transition their state to *En Route*.

---

### How to Practice
1. Pick a problem.
2. Explain to your AI interviewer *which* pattern you think is best and *why*.
3. Once the interviewer agrees with your architecture, write the code!
