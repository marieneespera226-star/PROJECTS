const readline = require('readline');

// Object-Oriented Budget Tracker Class
class BudgetTracker {
    constructor(income, rent, food, utilities, savingsPercentage) {
        this.income = Number(income);
        this.rent = Number(rent);
        this.food = Number(food);
        this.utilities = Number(utilities);
        this.savingsPercentage = Number(savingsPercentage);
    }

    getTotalExpenses() {
        return this.rent + this.food + this.utilities;
    }

    getSavingsAmount() {
        return this.income * (this.savingsPercentage / 100);
    }

    getRemainingBalance() {
        return this.income - this.getTotalExpenses() - this.getSavingsAmount();
    }

    getStatus() {
        return this.getRemainingBalance() >= 0 ? "Within Budget" : "Over Budget";
    }

    formatCurrency(amount) {
        return "PHP " + amount.toFixed(2);
    }
}

// Terminal I/O Interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("--- BUDGET TRACKER SYSTEM (JAVASCRIPT) ---");

rl.question("Enter Monthly Income (PHP): ", (income) => {
    rl.question("Enter Housing/Rent Expense (PHP): ", (rent) => {
        rl.question("Enter Food & Groceries Expense (PHP): ", (food) => {
            rl.question("Enter Utilities & Bills Expense (PHP): ", (utilities) => {
                rl.question("Enter Target Savings (%): ", (savingsRate) => {

                    // Create instance of BudgetTracker class
                    const tracker = new BudgetTracker(income, rent, food, utilities, savingsRate);

                    console.log("\n--- BUDGET SUMMARY ---");
                    console.log("Total Income: " + tracker.formatCurrency(tracker.income));
                    console.log("Total Expenses: " + tracker.formatCurrency(tracker.getTotalExpenses()));
                    console.log("Allocated Savings: " + tracker.formatCurrency(tracker.getSavingsAmount()));
                    console.log("Remaining Balance: " + tracker.formatCurrency(tracker.getRemainingBalance()));
                    console.log("Budget Status: " + tracker.getStatus());

                    rl.close();
                });
            });
        });
    });
});