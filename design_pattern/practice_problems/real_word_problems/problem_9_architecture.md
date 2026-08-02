# LRU Cache Architecture Diagram

This diagram visualizes your exact implementation for Problem 9, including the Strategy Pattern for the cache wrapper and the underlying Map + Doubly Linked List combination for `O(1)` operations.

```mermaid
classDiagram
    class CacheInterFace {
        <<interface>>
        +capacity: Number
        +puts(key, value, ttl)*
        +gets(key)*
    }
    
    class CacheStrategy {
        -cacheStrategy: CacheInterFace
        +setCacheStrategy(strategy: CacheInterFace)
        +puts(key, value, ttl)
        +gets(key)
    }
    
    class LRUCache {
        -capacity: Number
        -cache: Map~Key, Node~
        -list: DoublyLinkedList
        +puts(key, value, ttl)
        +gets(key)
    }
    
    class DoublyLinkedList {
        -head: Node
        -tail: Node
        -listLength: Number
        +addToTail(node)
        +remove(node)
        +removeHead() Node
        +moveToTail(node)
    }
    
    class Node {
        +key: Any
        +value: Any
        +ttl: Number
        +prev: Node
        +next: Node
    }
    
    CacheStrategy o-- CacheInterFace : Uses
    CacheInterFace <|-- LRUCache : Implements
    LRUCache *-- DoublyLinkedList : Owns 1
    LRUCache o-- Node : Maps Keys to Nodes
    DoublyLinkedList o-- Node : Chains Nodes
```
