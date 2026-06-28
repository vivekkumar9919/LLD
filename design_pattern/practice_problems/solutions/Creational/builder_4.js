/**
 **builder_4** (Report Generator): The Stateful Builder
 
 ### The Scenario (Interview Style)
 You are building a reporting service that generates dashboard reports (like a PDF 
 or HTML page). A report is made up of a Header, a Footer, and an arbitrary 
 number of Data Tables in between.

 You want to provide developers with a Fluent Builder so they can easily construct 
 reports step-by-step:
 `new ReportBuilder().setHeader('Sales').addTableData(data1).addTableData(data2).setFooter('Confidential').build();`

 ### The Constraint
 - `addTableData()` can be called as many times as the developer wants. It should 
   simply append the new table to a list of tables.
 - `setHeader()` and `setFooter()` represent single, unique elements on the page. 
   If a developer accidentally calls `.setHeader('Sales').setHeader('Marketing')`, 
   your system shouldn't just silently overwrite the first header. It should throw 
   an Error preventing them from calling it twice!

 ### Your Task
 Implement the builder to support these stateful constraints. You must track 
 whether certain methods have already been called, and enforce the rules! 

 *(Reminder: I will not give you the class or property names. You must design the 
 architecture yourself!)*
 */

class Report {
  constructor(header, table, footer) {
    this.headers = header;
    this.table = table;
    this.footer = footer;
  }
}

class ReportBuilder {
  constructor() {
    this.reportData = {
      table: []
    };
  }
  setHeaders(headersData) {
    if (this.reportData?.header) {
      throw new Error("Headers is already set");
    }
    if (!headersData) {
      throw new Error("Provide the headers");
    }
    this.reportData.header = headersData;
    return {
      setTable: this.setTable.bind(this)
    }
  }
  setTable(tableData) {
    if (!tableData) {
      throw new Error("Provide the table data");
    }
    this.reportData.table.push(tableData);
    return {
      setTable: this.setTable.bind(this),
      setFooter: this.setFooter.bind(this),
    }
  }
  setFooter(footersData) {
    if (this.reportData?.footer) {
      throw new Error("Footer is already set");
    }
    if (!footersData) {
      throw new Error("Provide the footer");
    }
    this.reportData.footer = footersData;
    return {
      build: this.build.bind(this)
    }
  }
  build() {
    return new Report(
      this.reportData.header,
      this.reportData.table,
      this.reportData.footer
    );
  }
}


const report1 = new ReportBuilder().setHeaders("Headers").setTable({"name":"vivek"}).setFooter("Footer").build();
const report2 = new ReportBuilder().setHeaders("Header").setTable({ "name": "vivek" }).setTable({ "name": "akhil" }).setFooter("Footer").build();
console.log(report2);

/*
================================================================================
🤖 PRACTICE REVIEWER FEEDBACK
================================================================================
**Rating:** ⭐⭐⭐ (3/5)

### 🚨 Code Issues & Concept Check
You successfully constructed the object, but you brought the **Step Builder** pattern (from `builder_3`) 
into a problem that didn't ask for it! 
By returning bound methods, you enforced a strict sequence (`Header -> Table -> Footer`).

But Builders are meant to be flexible! What if a developer wants to write:
`new ReportBuilder().setFooter('end').setTable(data).setHeaders('start').build()`?
Your current implementation prevents them from doing that because `setFooter` only returns `build`.

1. **Misapplied Pattern:** To make a **Stateful Builder**, you should go back to returning 
`this` at the end of every method. That gives the developer the freedom to call the methods in any order. 
To prevent them from calling `setHeaders` twice, you rely *entirely* on your internal `if()` checks!
2. **Typo in State Check:** Look closely at your `setHeaders` method. You check `if (this.reportData?.headers)`
 but then you set `this.reportData.header` (singular). Because of that typo, your state check would never actually trigger!
3. **Redundancy:** Because you used the Step Builder pattern, your state checks (`if (this.reportData.footer)`) 
are actually useless! `setFooter` only returns `{ build }`, so it's physically impossible for 
the client to call `setFooter()` twice anyway.

### 🧠 Deep Dive Questions
1. **The Reusability Bug:** In your current code, if a developer calls `.build()`, your builder does NOT reset `this.reportData`. If they try to reuse the same builder instance to make a second report, your state checks will instantly throw an error (because header and footer are already set from the first report). How do you fix this?

**Next Steps:** Rip out the Step Builder (stop returning bound methods and just `return this`). Fix the `header` typo so your state checks actually work. Reset the state in `.build()`. Drop your answer below and ping me for a re-review!
================================================================================
*/