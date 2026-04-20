

// Bad Example (Violates LSP)
/**
class BankAccount {

    constructor() {
        this.amount = 0;
    }

    deposite(amount) {
        console.log("Amount deposits to bank", amount);
        this.amount += amount;
        console.log("Final Amount to bank", this.amount);
    }

    withdrawal(amount) {
        console.log("Amount to be withdraw");
        if (this.amount - amount < 0) {
            console.log("Do not have sufficient money to withdraw")
        }
        this.amount = this.amount - amount;
        console.log("Final Amount to bank", this.amount);
    }
}

class CurrentAccount extends BankAccount {
    deposite(amount) {
        console.log("Amount deposits to bank CurrentAccount", amount);
        this.amount += amount;
        console.log("Final Amount to bank CurrentAccount", this.amount);
    }

    withdrawal(amount) {
        console.log("Amount to be withdraw CurrentAccount");
        if (this.amount - amount < 0) {
            console.log("Do not have sufficient money to withdraw CurrentAccount")
        }
        this.amount = this.amount - amount;
        console.log("Final Amount to bank CurrentAccount", this.amount);
    }
}
class SavingAccount extends BankAccount {
    deposite(amount) {
        console.log("Amount deposits to bank SavingAccount", amount);
        this.amount += amount;
        console.log("Final Amount to bank SavingAccount", this.amount);
    }

    withdrawal(amount) {
        console.log("Amount to be withdraw SavingAccount");
        if (this.amount - amount < 0) {
            console.log("Do not have sufficient money to withdraw SavingAccount")
        }
        this.amount = this.amount - amount;
        console.log("Final Amount to bank SavingAccount", this.amount);
    }
}
class FDAccount extends BankAccount {
    deposite(amount) {
        console.log("Amount deposits to bank FDAccount", amount);
        this.amount += amount;
        console.log("Final Amount to bank FDAccount", this.amount);
    }

    withdrawal(amount) {
        console.log("Amount to be withdraw FDAccount" ,amount);
        throw new Error("Amount can be withdraw from the FDAccount")
    }
}

const account =  new BankAccount();

account.deposite(100);
account.withdrawal(10);

const saving =  new SavingAccount();
saving.deposite(200);
saving.withdrawal(100);

const deposits =  new FDAccount();
deposits.deposite(300);
deposits.withdrawal(50)

 */

class NonWithdrawableAccount {
    constructor() {
        this.amount = 0;
    }
    deposite(amount) {
        console.log("Amount deposits to bank ", amount);
        this.amount += amount;
        console.log("Final Amount to bank", this.amount);
    }
}

class WithdrawalAccount extends NonWithdrawableAccount {

    withdrawal(amount) {
        console.log("Amount to be withdraw ");
        if (this.amount - amount < 0) {
            console.log("Do not have sufficient money to withdraw ")
        }
        this.amount = this.amount - amount;
        console.log("Final Amount to bank ", this.amount);
    }
}

class CurrentAccount extends WithdrawalAccount {

}
class SavingAccount extends WithdrawalAccount {

}

class FDAccount extends NonWithdrawableAccount {

}

const saving = new SavingAccount();
saving.deposite(200);
saving.withdrawal(100);

// const deposits = new FDAccount();
// deposits.deposite(300);










