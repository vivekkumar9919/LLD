
// **solid_4** (ISP): Segregate an interface/base class called `UserOperations` (which holds methods like `login`, 
// `logout`, `banUser`, `grantPermissions`) so that normal `Customer` objects aren't forced to inherit admin 
// methods they shouldn't trigger.

// login and logout are then basic feature required for all types of the user 
class UserOptions {
    login() {
        console.log("Login");
    }
    logout() {
        console.log("Logout");
    }
}
// banUser and grantPermissions only for admin
class AdminUserOptions extends UserOptions {
    banUser() {
        console.log("banUser");
    }
    grantPermissions() {
        console.log("grantPermissions");
    }
}

// for future if any new requirement only for normal user comes so no need to change the UserOptions
class NormalUserOptions extends UserOptions {

}

const normalUser = new NormalUserOptions()
normalUser.login();
normalUser.logout();

const adminUser = new AdminUserOptions();
adminUser.login();
adminUser.grantPermissions();
adminUser.banUser();

/*
=========================================
INTERROGATION QUESTIONS (Practice: solid_4)
=========================================
1. Subclass Coupling & Class Fattening:
   Since `AdminUserOptions` inherits `UserOptions` directly, it forms a tight parent-child 
   dependency. In standard SOLID design, inheritance is actually a code smell because 
   any signature changes in `UserOptions` (like changing `login(username)` to require 
   an MFA token) will propagate and force a re-deployment of `AdminUserOptions`. 
   To solve this coupling, shouldn't we simply merge everything into a single, flat 
   `User` class containing all methods, and handle roles dynamically inside each 
   method (e.g., checking `if (user.role !== 'admin') throw new Error()` inside `
   banUser`)? Defend your current segregated approach against this single-class 
   proposal.

2. Scaling Roles (Inheritance vs. Composition):
   If we introduce more user categories, such as `Moderator` (can login, logout, and 
   banUser, but cannot grantPermissions) and `ReadOnlyAdmin` (can login, logout, 
   viewAuditLogs, but cannot banUser), class inheritance becomes very messy and leads 
   to class explosion.
   How would you refactor this to support complex combinations of user capabilities 
   in JavaScript without relying on subclass inheritance?

---Vivek Answer---

1. Subclass Coupling & Class Fattening:
   if we merge everything into a single flat class the we have to check the role and
   permission in every function call which break the open close principle and also
   we have to redeploy the every feature when new role is added and also violates 
   the single responsibility principle

2. Scaling Roles (Inheritance vs. Composition):
   To stop class explosion we can use the Bridge design pattern 

--- AI EVALUATION ---
1. Subclass Coupling & Class Fattening:
   - What is Right: Your defense is flawless. You correctly identified that merging roles into a single fat class with inline role checks violates OCP (adding new roles changes existing code) and SRP (multiple reasons to change). It also forces normal clients to depend on administrative interfaces, directly violating ISP.
   - What is Wrong: Nothing.
   - What is Missing: None.

2. Scaling Roles (Inheritance vs. Composition):
   - What is Right: The **Bridge Pattern** is a valid structural way to decouple abstractions (User Roles) from implementations (Operations/Capabilities).
   - What is Wrong: In JavaScript, implementing a full Bridge pattern for user roles can be excessively heavy and boilerplate-heavy.
   - What is Missing: The most idiomatic JavaScript solution is **Object Composition / Mixins** (or Strategy pattern). Instead of deep inheritance structures, you define small, focused capability objects (`canLogin`, `canBan`, etc.) and compose them at runtime onto a base user object using `Object.assign()` or composition hooks.
*/