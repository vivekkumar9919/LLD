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
  - **Challenge:** You have 500 files in your codebase calling `LegacyAnalytics.sendData()`. You cannot rewrite all 500 files. Architect a solution that intercepts these old XML calls and safely translates them into the JSON format expected by Mixpanel, so the rest of the codebase doesn't even know the vendor changed.

---

### How to Practice
1. Pick a problem.
2. Explain to your AI interviewer *which* pattern you think is best and *why*.
3. Once the interviewer agrees with your architecture, write the code!
