# LLD Practice Tracker

This document tracks coding practice problems. Whenever a topic is formally reviewed and completed, the LLD Reviewer Agent places 4 to 5 specific, e-commerce or backend-focused challenges here. You can tackle these whenever you have free time to reinforce your learning.

## SOLID Principles
*Status: Ready to Practice*
- [x] **solid_1** (SRP): Refactor a monolithic `OrderProcessor` class that currently calculates tax, applies discounts, generates a PDF receipt, and saves to the DB into strictly separate classes.
- [x] **solid_2** (OCP): Build an `AuthenticationService` that can support `OAuthLogin`, `EmailLogin`, and `SSOLogin` without ever modifying the core orchestrator.
- [x] **solid_3** (LSP): Implement a generic `PaymentMethod` interface. Ensure that a subclass `WalletPayment` and `CryptoPayment` never unexpectedly crash or require the client code to write explicit `instanceof` checks if a specific feature (like "refund") is requested.
- [x] **solid_4** (ISP): Segregate an interface/base class called `UserOperations` (which holds methods like `login`, `logout`, `banUser`, `grantPermissions`) so that normal `Customer` objects aren't forced to inherit admin methods they shouldn't trigger.
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

## Structural: Decorator Pattern
*Status: Ready to Practice*
- [ ] **decorator_1** (Coffee Shop): Implement a `Beverage` base class. Create decorators like `Milk`, `Mocha`, and `Whip` that dynamically calculate the `cost()` and `getDescription()` of the beverage.
- [ ] **decorator_2** (Notifier System): Build an `EmailNotifier`. Decorate it with `SMSNotifier` and `SlackNotifier` so that a critical system alert can be sent via Email + SMS + Slack by stacking the decorators.
- [ ] **decorator_3** (Data Source API): Implement a basic `FileDataSource` that writes/reads string data. Create a `EncryptionDecorator` (encrypts before writing) and a `CompressionDecorator` (compresses before writing). Chain them together.
- [ ] **decorator_4** (Web Request Logger): Build a `BaseRequestHandler`. Add decorators like `AuthenticationCheck`, `Logging`, and `RateLimiting` that wrap the core handler to add middleware-like behavior without modifying the base handler.

## Structural: Facade Pattern
*Status: Ready to Practice*
- [ ] **facade_1** (Video Converter): Create a `VideoConversionFacade` that hides the complexities of `AudioMixer`, `VideoFile`, `BitrateReader`, and `CodecFactory` behind a single `convertVideo(filename, format)` method.
- [ ] **facade_2** (E-Commerce Checkout): Build a `CheckoutFacade` that coordinates `InventoryService.checkStock()`, `PaymentGateway.process()`, and `ShippingService.schedule()`. Ensure the facade takes dependencies via constructor (DIP).
- [ ] **facade_3** (Smart Home API): Create a `SmartHomeFacade` to easily trigger "Morning Mode" or "Night Mode", which internally coordinates `LightingSystem`, `Thermostat`, and `SecuritySystem`.
- [ ] **facade_4** (Database Migration): Hide the complexity of a database migration behind a `MigrationFacade` that coordinates `SchemaAnalyzer`, `DataTransferAgent`, and `ConnectionPoolManager`.

## Structural: Proxy Pattern
*Status: Ready to Practice*
- [ ] **proxy_1** (Virtual Proxy - Heavy Document): Build a `DocumentProxy` that only loads a massive 100MB `RealDocument` from disk when the `render()` method is called, but can return the document's `metadata` instantly without loading the file.
- [ ] **proxy_2** (Protection Proxy - Admin API): Implement a `DatabaseProxy` that intercepts `deleteRow()` calls and throws an Error if the `currentUser.role` is not 'SUPER_ADMIN'. Allow `getRow()` calls for everyone.
- [ ] **proxy_3** (Cache Proxy - API Fetcher): Create a `WeatherAPIProxy` that wraps a `RealWeatherAPI`. If `getWeather(city)` is called, the proxy should return a cached response if it was fetched within the last 5 minutes. Otherwise, it delegates to the real API and updates the cache.
- [ ] **proxy_4** (Smart Reference Proxy): Build a `ConnectionProxy` that wraps a `DBConnection`. The proxy should keep track of the number of active clients using the connection. If the active clients drop to 0, it automatically calls `realConnection.close()`.

## Structural: Composite Pattern
*Status: Ready to Practice*
- [ ] **composite_1** (UI Components): Implement a UI hierarchy with a `UIComponent` interface. Create Leaf nodes (`Button`, `Input`) and Composite nodes (`Panel`, `Window`). Ensure calling `render()` on the Window recursively renders all children.
- [ ] **composite_2** (Organization Chart): Model a company structure with `Employee` (Leaf) and `Manager` (Composite). Implement a `getSalary()` method that calculates the total salary of a manager and all their direct/indirect subordinates.
- [ ] **composite_3** (HTML DOM Builder): Create an object-oriented DOM builder. An `HTMLElement` can contain text (Leaf) or other `HTMLElement`s (Composite). Implement a `toHTML()` method that outputs the properly nested HTML string (e.g., `<div><p>Hello</p></div>`).
- [ ] **composite_4** (Math Expression Tree): Build an expression evaluator where `Operand` (Leaf, e.g., 5) and `Operator` (Composite, e.g., Add, Multiply) share an `evaluate()` interface. Construct the tree for `(5 + 3) * 2` and call `evaluate()` on the root.

## Structural: Bridge Pattern
*Status: Ready to Practice*
- [ ] **bridge_1** (Device & Remote): Create a `Device` interface (`TV`, `Radio`) and a `RemoteControl` abstraction (`BasicRemote`, `AdvancedRemote`). The remotes should take a device in their constructor. The advanced remote adds a `mute()` method.
- [ ] **bridge_2** (Message Sender): Create a `MessageSender` abstraction (`TextMessage`, `HtmlMessage`) and a `MessagePlatform` implementor (`EmailPlatform`, `SMSPlatform`, `WhatsAppPlatform`). Send formatted messages across different platforms without class explosion.
- [ ] **bridge_3** (Theme System): Build a UI framework with `UIElement` abstraction (`Button`, `Dropdown`) and a `Theme` implementor (`DarkTheme`, `LightTheme`). A `Button` injected with a `DarkTheme` renders differently than one with a `LightTheme`.
- [ ] **bridge_4** (Payment Gateway Provider): Separate the abstraction `PaymentMethod` (`Subscription`, `OneTimePurchase`) from the implementor `PaymentGateway` (`Stripe`, `PayPal`). Process a recurring subscription using Stripe, and a one-time purchase using PayPal.

## Structural: Flyweight Pattern
*Status: Ready to Practice*
- [ ] **flyweight_1** (E-commerce Product Catalog): Build a `ProductCatalog` where multiple instances of the same Product ID share the same `ProductFlyweight` (Name, Category, ImageURL, Brand, Specifications) but have unique `ProductItem` contexts (SKU, Price, StockCount, WarehouseLocation).
- [ ] **flyweight_2** (Chat System Memory Optimization): Create a `ChatApp` where millions of messages share a `MessageFlyweight` (SenderName, AvatarURL, ThemeSettings) but have unique `MessageContext` (MessageText, Timestamp, MessageID, DeliveryStatus).
- [ ] **flyweight_3** (Text Editor Formatting): Implement a text editor where each character in a document of 100,000 letters shares a `CharacterFlyweight` (FontFamily, FontSize, Color, Style) to avoid storing styling parameters for every single letter, while the position and the character code are stored in the context.
- [ ] **flyweight_4** (E-commerce Order History Tracker): Implement an `OrderHistoryTracker`. Millions of orders share an `OrderStatusFlyweight` (StatusName, IconURL, EmailNotificationTemplate, SLAHours) while each individual order contains unique `OrderContext` (OrderID, CustomerID, UpdateTime, Comments).

## Behavioral: Observer Pattern
*Status: Ready to Practice*
- [ ] **observer_1** (Stock Market Ticker): Build a `StockMarket` subject that updates stock prices. Implement `MobileAppObserver` and `WebDashboardObserver` that subscribe to price updates. Ensure observers can specify which specific stocks (e.g., "AAPL", "GOOG") they want to listen to.
- [ ] **observer_2** (E-commerce Order Status Notification): Implement an `OrderTracker` (Subject). Whenever an order's status changes (e.g., PLACED -> SHIPPED -> DELIVERED), trigger notifications. Observers like `SMSNotificationService`, `EmailNotificationService`, and `InventorySystem` should update accordingly.
- [ ] **observer_3** (Bid Auction System): Build a `RealTimeAuction` platform where the `AuctionProduct` acts as the Subject. When a bidder places a higher bid, all other registered bidders (Observers) must be immediately notified of the new high bid amount.
- [ ] **observer_4** (Multi-channel Newsletter): Create a `NewsletterPublisher` (Subject) that pushes monthly articles. Introduce `PushNotificationClient` and `EmailClient`. Demonstrate unsubscribe logic cleanly.