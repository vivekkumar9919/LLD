# Summary

## About
- **Proxy Pattern (Structural)**: A proxy acts like a middleman or surrogate between a client and a real object. It controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.
- Unlike Decorator (which augments behavior), the intent of Proxy is strictly **control**.

## Core Types of Proxies
1. **Virtual Proxy**: Defers the creation and initialization of a resource-intensive object until it is absolutely needed (Lazy Loading).
2. **Protection Proxy**: Controls access to the original object based on access rights or authentication rules.
3. **Remote Proxy**: Represents an object that is located remotely (e.g., in a different address space or server), managing network communication (like gRPC or REST stubs).
4. **Cache Proxy**: Caches results of expensive operations from the real subject to improve performance for subsequent identical requests.

## Resources
- [YouTube Video Link](https://www.youtube.com/watch?v=xuT6OOYVJTQ)
- [Refactoring Guru - Proxy](https://refactoring.guru/design-patterns/proxy)

## My Notes
- **LSP Considerations**: Ideally, both the Proxy and the Real Subject should implement the same interface. This ensures the client can treat them interchangeably without knowing they are talking to a proxy.
- **Proxy vs Decorator**: 
  - *Decorator*: Focuses on adding responsibilities dynamically.
  - *Proxy*: Focuses on controlling access to an object.

### Tradeoffs / Pros & Cons
**Pros**:
1. **Separation of Concerns**: You can manage the lifecycle, security, or caching of an object without polluting the object's actual business logic.
2. **Performance Optimization**: Virtual and Cache proxies drastically improve startup times and reduce redundant processing.
3. **Security**: Protection proxies ensure strict access control at the object level.

**Cons**:
1. **Code Complexity**: Introduces new classes and layers of abstraction.
2. **Latency**: The proxy adds an extra layer of indirection, which might introduce slight delays, especially in Remote or Cache proxies doing heavy lookups.

## Examples Solved
- **Virtual Proxy**: Implemented `ImageProxy` that delays the heavy processing of a `HighResolutionImage` until the `display()` method is actually called.
- **Protection Proxy**: Implemented `BankAccountProxy` that intercepts the `viewAccount()` call and verifies if the user object has the `admin` role before delegating to the real `BankAccount`.
