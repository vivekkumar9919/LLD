# LLD Practice Tracker

This document tracks coding practice problems. Whenever a topic is formally reviewed and completed, the LLD Reviewer Agent places 4 to 5 specific, e-commerce or backend-focused challenges here. You can tackle these whenever you have free time to reinforce your learning.

## SOLID Principles
*Status: Ready to Practice*
- [ ] **SRP**: Refactor a monolithic `OrderProcessor` class that currently calculates tax, applies discounts, generates a PDF receipt, and saves to the DB into strictly separate classes.
- [ ] **OCP**: Build an `AuthenticationService` that can support `OAuthLogin`, `EmailLogin`, and `SSOLogin` without ever modifying the core orchestrator.
- [ ] **LSP**: Implement a generic `PaymentMethod` interface. Ensure that a subclass `WalletPayment` and `CryptoPayment` never unexpectedly crash or require the client code to write explicit `instanceof` checks if a specific feature (like "refund") is requested.
- [ ] **ISP**: Segregate an interface/base class called `UserOperations` (which holds methods like `login`, `logout`, `banUser`, `grantPermissions`) so that normal `Customer` objects aren't forced to inherit admin methods they shouldn't trigger.
- [ ] **DIP**: Build a `NotificationManager`. Instead of hardcoding `new SMSService()`, inject an abstract messaging dependency through the constructor so you can swap it for an `EmailService` instantly.

## Creational: Singleton
*Status: Ready to Practice*
- [ ] Implement a **Database Connection Pool** class asynchronously. Ensure the exact same pool instance is securely returned to 3 incoming API requests running concurrently. 
- [ ] Implement a **Logger** class eagerly. Ensure all components in the app write to the exact same log buffer array without race conditions.
- [ ] Implement a Singleton `FeatureToggleService` that fetches a massive remote JSON config (delay mock with setTimeout). Test what happens if multiple modules request the toggle status while the network request is still pending.
