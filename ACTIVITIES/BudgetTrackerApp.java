import java.util.Scanner;

// OOP Class for Budget Calculations
class BudgetTracker {
    private double income;
    private double rent;
    private double food;
    private double utilities;
    private double savingsPercentage;

    // Constructor
    public BudgetTracker(double income, double rent, double food, double utilities, double savingsPercentage) {
        this.income = income;
        this.rent = rent;
        this.food = food;
        this.utilities = utilities;
        this.savingsPercentage = savingsPercentage;
    }

    // Methods
    public double getTotalExpenses() {
        return rent + food + utilities;
    }

    public double getSavingsAmount() {
        return income * (savingsPercentage / 100.0);
    }

    public double getRemainingBalance() {
        return income - getTotalExpenses() - getSavingsAmount();
    }

    public String getStatus() {
        if (getRemainingBalance() >= 0) {
            return "Within Budget";
        } else {
            return "Over Budget";
        }
    }

    public double getIncome() {
        return income;
    }
}

// Main Driver Class
public class BudgetTrackerApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("--- BUDGET TRACKER SYSTEM (JAVA) ---");

        System.out.print("Enter Monthly Income (PHP): ");
        double income = scanner.nextDouble();

        System.out.print("Enter Housing/Rent Expense (PHP): ");
        double rent = scanner.nextDouble();

        System.out.print("Enter Food & Groceries Expense (PHP): ");
        double food = scanner.nextDouble();

        System.out.print("Enter Utilities & Bills Expense (PHP): ");
        double utilities = scanner.nextDouble();

        System.out.print("Enter Target Savings (%): ");
        double savingsRate = scanner.nextDouble();

        // Object Instantiation
        BudgetTracker tracker = new BudgetTracker(income, rent, food, utilities, savingsRate);

        System.out.println("\n--- BUDGET SUMMARY ---");
        System.out.printf("Total Income: PHP %.2f\n", tracker.getIncome());
        System.out.printf("Total Expenses: PHP %.2f\n", tracker.getTotalExpenses());
        System.out.printf("Allocated Savings: PHP %.2f\n", tracker.getSavingsAmount());
        System.out.printf("Remaining Balance: PHP %.2f\n", tracker.getRemainingBalance());
        System.out.printf("Budget Status: %s\n", tracker.getStatus());

        scanner.close();
    }
}9