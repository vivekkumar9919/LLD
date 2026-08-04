# E-Commerce Inventory Manager Architecture Diagram

This diagram visualizes your exact implementation for Problem 10, highlighting the decoupling of the `Product` data model from the `InventoryManager` state logic, and showing how the `CartManager` interacts with the system to create temporary `Reservation` objects.

```mermaid
classDiagram
    class ProductInterface {
        <<interface>>
        +name: String
        +stock: Number
        +sku: String
        +price: Number
        +getProduct()*
    }
    
    class SimpleProduct {
        +name: String
        +stock: Number
        +sku: String
        +price: Number
        +getProduct() Object
    }
    
    class Reservation {
        +userId: String
        +sku: String
        +quantity: Number
        +expiryTime: Number
        +getUserId() String
        +getQuantity() Number
        +getExpiryTime() Number
        +isExpired() Boolean
        +resetExpiry()
    }
    
    class InventoryManager {
        -inventory: Map~String, ProductInterface~
        -reservations: Map~String, Reservation~
        +addReservation(reservation: Reservation)
        +isStockAvailable(sku: String, requiredQty: Number) Object
        +addProductMapping(product: ProductInterface)
    }
    
    class CartManager {
        -username: String
        -inventoryManager: InventoryManager
        +addToCart(username: String, productDetails: Object)
    }
    
    ProductInterface <|-- SimpleProduct : Implements
    InventoryManager o-- ProductInterface : Manages (inventory Map)
    InventoryManager o-- Reservation : Manages (reservations Map)
    CartManager o-- InventoryManager : Uses
    CartManager ..> Reservation : Creates
```
