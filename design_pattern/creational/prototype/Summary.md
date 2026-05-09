# Summary
Instead of creating objects from scratch,
create new objects by copying/cloning existing objects.

## About
- 

## Resources
- [YouTube Video Link](https://www.youtube.com/watch?v=KMQFNV8LFec)
- [Doc Link]()

## My Notes
- Object data is created new every time, but methods are shared via the constructor's `prototype`.
- A true Prototype pattern relies on a `clone()` method rather than instantiating via `new ClassName(...)` with full initialization logic.
- `structuredClone()` is the modern native JS way to deep clone.

## Examples Solved
- Cloning a `Resume` object with an array of skills.

## Pros
- **Performance**: Avoids costly initialization (e.g., DB queries, heavy computations) by duplicating an existing state.
- **Flexibility**: You can dynamically add/remove properties from the cloned object without affecting the original blueprint.

## Cons
- **Cloning Complexity**: Deep cloning objects with circular references or complex nested structures is inherently difficult.
- **Hidden State**: Cloned objects might carry over hidden state or dependencies that shouldn't be duplicated.

## Tradeoffs
- **Shallow vs Deep Copy**: A shallow copy is fast but shares references for nested objects (mutating one mutates the other). A deep copy is safe but computationally expensive.
- **Resource Management**: Cloning objects with network sockets or DB connections is dangerous; you must explicitly decide whether to share or recreate them.

## Code Example

```javascript
class Resume {
    constructor(name, skills) {
        this.name = name;
        this.skills = skills;
    }

    print() {
        console.log(this.name, this.skills);
    }

    clone() {
        return new Resume(
            this.name,
            [...this.skills]
        );
    }
}

const original = new Resume("Vivek", ["NodeJS"]);
const copy = original.clone();
```

### What Happens Here
1. `new Resume(...)`: Creates a completely NEW object. `original !== copy` because both have different memory references.
2. `[...this.skills]`: Creates a NEW array. Without spread, both objects would share the same array (changing one affects the other).
3. `print()` and `clone()` are NOT recreated: They are stored once in `Resume.prototype` and shared by all objects.

### Why Prototype Is Efficient
- **Without prototype**: Every object gets new function copies.
- **With prototype**: All objects share same functions.
- **Result**: Less memory usage, faster object creation, cleaner inheritance.

### Final Mental Model
- **Object data** → new every time
- **Methods** → shared via prototype