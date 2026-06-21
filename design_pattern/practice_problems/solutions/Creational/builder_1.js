/**
 **builder_1** (Query Builder): Implement a `SQLQueryBuilder` that supports 
 `select()`, `from()`, `where()`, `join()`, and `limit()`. Ensure the `build()`
  method returns a valid SQL string and handles multiple `where` clauses correctly.
 */

class SQLQueryBuilder {
    constructor() {
        this.selectFields = "*";
        this.fromTable = "";
        this.whereClause = [];
        this.joinClause = [];
        this.limitQuery = null;
    }
    select(fields) {
        this.selectFields = fields;
        return this;
    }
    from(table) {
        this.fromTable = table;
        return this;
    }
    where(condition) {
        if (condition.length > 0) this.whereClause.push(condition)
        return this;
    }
    join(table, condition) {
        if (table && condition) this.joinClause.push({ table, condition });
        return this;
    }
    limit(value) {
        this.limitQuery = value;
        return this;
    }
    build() {
        if (!this.fromTable) { throw new Error("Query table is required ") };
        let query = `SELECT ${this.selectFields} FROM ${this.fromTable} `
        if (this.whereClause) {
            query += ` WHERE ${this.whereClause.join(" AND ")}`
        }
        if (this.joinClause) {
            query += ` JOIN ${this.joinClause.map(join => `JOIN ${join.table} ON ${join.condition}`).join(" AND ")}`
        }
        if (this.limitQuery) {
            query += ` LIMIT ${this.limitQuery}`
        }
        return query;
    }
}

const sqlQuery = new SQLQueryBuilder().select('user_name').from('users').where('age > 18').join('orders', 'users.id = orders.user_id').limit(10).build();
console.log(sqlQuery);

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================
**Rating:** ⭐⭐⭐ (3/5)

### 🚨 Code Issues & Concept Check
You absolutely nailed the core concept of the **Fluent Builder Pattern**! 
By returning `this` at the end of every method, you enabled method chaining 
(`.select().from().where().build()`), which is exactly how builders are supposed 
to work.

However, I had to dock a couple of stars because your `build()` method generates 
invalid SQL due to some JavaScript quirks:

1. **Truthy Arrays:** In JavaScript, an empty array `[]` is "truthy". So 
`if (this.whereClause)` will ALWAYS be true, even if no `.where()` was called. 
If I run `new SQLQueryBuilder().from('users').build()`, your code outputs: 
`SELECT * FROM users  WHERE ` (with an empty where clause). You need to check 
`if (this.whereClause.length > 0)`.
2. **Join Syntax:** Look closely at your join string interpolation. 
If I call `.join('orders', 'x = y')`, your code outputs: ` JOIN JOIN orders ON x = y`.
 You have a hardcoded `JOIN` right before the `.map`! Also, multiple SQL JOINs
  are separated by spaces, not by `AND`. It should be `.join(" ")`.

### 🧠 Deep Dive Questions
1. **State & Reusability:** What happens if a developer creates a builder, 
calls `.build()`, and then decides to reuse that *exact same* builder instance 
to build a second query? It still holds all the state (arrays, strings) 
from the first query! How would you modify the Builder so that it safely 
"resets" its state every time `build()` is called, making it reusable?

**Next Steps:** Fix the string building bugs (checking `.length` and fixing the 
JOIN syntax), drop your answer below, and ping me for a re-review! 
================================================================================
*/