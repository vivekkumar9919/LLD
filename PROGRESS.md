# LLD Learning Progress

This document serves as the tracker for Vivek's backend LLD interview preparation. Following the `lld_reviewer` persona, I will append my review feedback directly into this document.

| Date | Topic | Key Strengths | Areas for Improvement | Score (1-10) |
| :--- | :--- | :--- | :--- | :--- |
| 2026-04-19 | SRP (SOLID) | Perfect strict SRP separation. Extracted Invoice & DB cleanly. | Avoid exposing properties (`cart.item`). Pluralize array names (`this.items`). | 9/10 |
| 2026-04-19 | OCP (SOLID) | Flawless OCP via abstract class extension. Pluralized `this.items`. | None. Just note this naturally transitions into the Strategy Pattern. | 10/10 |
| 2026-04-20 | LSP (SOLID) | Perfect inheritance structure. Avoided duplicated withdrawal logic. | None. Flawless LSP execution. | 10/10 |
| 2026-04-22 | ISP (SOLID) | Great segregation of 2D and 3D shapes. Good use of inheritance tree solving the fat interface. | Just note that JS leans heavily toward Object Composition instead of deep inheritance for ISP later on. | 9.5/10 |
| 2026-04-22 | DIP (SOLID) | Flawless Dependency Injection. Tightly coupled constructor fixed. Great use of encapsulation with `getItems()`. | None. Perfect final piece to SOLID. | 10/10 |
