// Without Protection Proxy

/** 
class BankAccount {
    viewAccount() {
        console.log("Showing bank account details");
    }
}

const account = new BankAccount();

account.viewAccount();

*/

// Solution → Protection Proxy

class BankAccount {
    viewAccount() {
        console.log("Showing bank account details");
    }
}

class BankAccountProxy {

    constructor(user) {
        this.user = user;
        this.realAccount = new BankAccount();
    }

    viewAccount() {

        // Protection Logic
        if (this.user.role !== "admin") {
            console.log("Access Denied");
            return;
        }

        this.realAccount.viewAccount();
    }
}

const normalUser = {
    name: "Vivek",
    role: "user"
};

const account1 = new BankAccountProxy(normalUser);

account1.viewAccount();

const adminUser = {
    name: "Rahul",
    role: "admin"
};

const account2 = new BankAccountProxy(adminUser);

account2.viewAccount();