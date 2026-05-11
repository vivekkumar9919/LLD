# LLD Practice Tracker

This document tracks coding practice problems. Whenever a topic is formally reviewed and completed, the LLD Reviewer Agent places 4 to 5 specific, e-commerce or backend-focused challenges here. You can tackle these whenever you have free time to reinforce your learning.

## SOLID Principles
*Status: Ready to Practice*
- [x] **solid_1** (SRP): Refactor a monolithic `OrderProcessor` class that currently calculates tax, applies discounts, generates a PDF receipt, and saves to the DB into strictly separate classes.
- [x] **solid_2** (OCP): Build an `AuthenticationService` that can support `OAuthLogin`, `EmailLogin`, and `SSOLogin` without ever modifying the core orchestrator.
- [x] **solid_3** (LSP): Implement a generic `PaymentMethod` interface. Ensure that a subclass `WalletPayment` and `CryptoPayment` never unexpectedly crash or require the client code to write explicit `instanceof` checks if a specific feature (like "refund") is requested.
- [ ] **solid_4** (ISP): Segregate an interface/base class called `UserOperations` (which holds methods like `login`, `logout`, `banUser`, `grantPermissions`) so that normal `Customer` objects aren't forced to inherit admin methods they shouldn't trigger.
- [ ] **solid_5** (DIP): Build a `NotificationManager`. Instead of hardcoding `new SMSService()`, inject an abstract messaging dependency through the constructor so you can swap it for an `EmailService` instantly.

## Creational: Singleton
*Status: Ready to Practice*
- [ ] **singleton_1**: Implement a **Database Connection Pool** class asynchronously. Ensure the exact same pool instance is securely returned to 3 incoming API requests running concurrently. 
- [ ] **singleton_2**: Implement a **Logger** class eagerly. Ensure all components in the app write to the exact same log buffer array without race conditions.
- [ ] **singleton_3**: Implement a Singleton `FeatureToggleService` that fetches a massive remote JSON config (delay mock with setTimeout). Test what happens if multiple modules request the toggle status while the network request is still pending.

## Creational: Factory Patterns
*Status: Ready to Practice*
- [ ] **factory_1** (Factory Method): Implement a `LogisticsApp`. Use a Factory Method to handle the creation of `Truck` (Road) and `Ship` (Sea) transport. Ensure you can add `Airplane` (Air) transport later without touching the main logic.
- [ ] **factory_2** (Abstract Factory): Build a `CrossPlatformUI` toolkit. Create an Abstract Factory `UIFactory` that produces `Button` and `Checkbox`. Implement concrete factories `WindowsFactory` and `MacFactory` to produce OS-specific variants.
- [ ] **factory_3** (Abstract Factory): Implement a `CloudResourceFactory` that manages families of related cloud services: `ComputeInstance` and `StorageBucket`. Provide concrete implementations for `AWSFactory` and `GCPFactory`.
- [ ] **factory_4** (Simple Factory): Refactor an e-commerce `DiscountCalculator` that uses a messy `switch` statement for 'BLACK_FRIDAY', 'CHRISTMAS', and 'HOLI' into a clean Factory structure.
- [ ] **factory_5** (Hybrid): Create a `PizzaStore` using the Factory Method for different regions (New York, Chicago) and then use an Abstract Factory inside those stores to create "Families" of ingredients (ThinCrust, Mozzarella vs ThickCrust, Reggiano).

## Creational: Builder Pattern
*Status: Ready to Practice*
- [ ] **builder_1** (Query Builder): Implement a `SQLQueryBuilder` that supports `select()`, `from()`, `where()`, `join()`, and `limit()`. Ensure the `build()` method returns a valid SQL string and handles multiple `where` clauses correctly.
- [ ] **builder_2** (E-commerce Order): Create an `OrderBuilder`. Use a **Director** to provide templates like `buildGuestOrder()` and `buildPremiumMemberOrder()` which automatically apply different discounts.
- [ ] **builder_3** (Stepwise Form): Build a `RegistrationFormBuilder` using the **Step Builder** pattern. Enforce the sequence: `Username -> Email -> Password -> (Optional) ProfilePic -> Build`.
- [ ] **builder_4** (Report Generator): Implement a `ReportBuilder` for a dashboard. It should support `setHeader()`, `addTableData()`, and `setFooter()`. Ensure that `addTableData()` can be called multiple times, but `setHeader()` can only be called once.
- [ ] **builder_5** (Game Character): Create a `CharacterBuilder` for an RPG. It should handle complex attributes like `setStats(str, dex, int)`, `setEquipments([])`, and `setAbilities([])`. Use the Builder to ensure a character cannot be built without a minimum "Health" value.

## Creational: Prototype Pattern
*Status: Ready to Practice*
- [ ] **prototype_1** (Invoice Cloning): Implement an `Invoice` object with an array of `lineItems`. Create a deep clone mechanism so that when an invoice is cloned for a recurring monthly payment, modifying the new invoice's `lineItems` doesn't affect the original invoice.
- [ ] **prototype_2** (Game NPC Spawning): Create a `MonsterRegistry` (Prototype Registry). Store configured prototype instances of "Goblin" and "Dragon". Provide a `spawnMonster(type)` method that clones and returns the appropriate monster to avoid running expensive stats generation logic multiple times.
- [ ] **prototype_3** (Document Management): Build a `Document` class with nested metadata objects (e.g., `author: {name, id}`). Implement a `clone()` method using `JSON.parse(JSON.stringify())` or `structuredClone()` to ensure true deep copying, and demonstrate the tradeoffs compared to a shallow copy.
- [ ] **prototype_4** (HTTP Request Builder): Create a `RequestTemplate` object that holds common headers and auth tokens. Use the Prototype pattern to clone this template for specific endpoints, allowing you to append new headers without mutating the global template.

## Structural: Adapter Pattern
*Status: Ready to Practice*
- [ ] **adapter_1** (Payment Gateway): You have an existing system using `StripeAdapter` with a method `pay(amount)`. A new requirement forces you to integrate `PayPalAPI` which only accepts `sendPayment(currency, value)`. Create an Adapter so the client can still call `pay(amount)`.
- [ ] **adapter_2** (Logger Migration): Your app uses a custom `Logger` with a `logMessage(msg)`. You want to switch to a powerful third-party library `WinstonLogger` which uses `info(text)` and `error(text)`. Write an Adapter to wrap `WinstonLogger` without changing your app's codebase.
- [ ] **adapter_3** (Legacy DB to ORM): You have a `LegacyDatabase` class with `executeSQL(query)`. You are migrating to a modern `MongoORM` that requires `insertOne(document)`. Create an Adapter that intercepts SQL-like method calls and translates them to MongoDB document inserts.
- [ ] **adapter_4** (Multi-Format Data Reader): Your application only understands JSON. You need to read data from a legacy API that returns CSV, and another that returns XML. Create `CSVAdapter` and `XMLAdapter` classes that convert these formats into the standard JSON interface your app expects.
