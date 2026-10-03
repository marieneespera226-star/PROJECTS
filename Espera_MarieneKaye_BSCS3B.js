// ABSTRACTION & INHERITANCE

// Abstract Base Class (Abstraction 1)
class NotificationService {
    constructor() {
        if (this.constructor === NotificationService) {
            throw new Error("Abstract class 'NotificationService' cannot be instantiated directly.");
        }
    }

    // Abstract Method
    sendNotice(tenantName, amount) {
        throw new Error("Method 'sendNotice()' must be implemented.");
    }
}

// Inherit 1 & Encap 1 (SMS Channel)
class SMSNotification extends NotificationService { // Inheritance 1
    #phoneNumber; // Encapsulation 1: Private property

    constructor(phoneNumber) { // Constructor 1
        super();
        this.#phoneNumber = phoneNumber;
    }

    // Method 1 (Getter)
    get maskedPhone() {
        return `+63-***-***-${this.#phoneNumber.slice(-4)}`;
    }

    // Polymorphism 1 Overridden sendNotice
    sendNotice(tenantName, amount) {
        console.log(`[SMS] Sent to ${tenantName} (${this.maskedPhone}): Total bill is ₱${amount}.`);
        return true;
    }
}

// Inherit 2 & Encap 2 (Email Channel)
class EmailNotification extends NotificationService { // Inheritance 2
    #emailAddress; // Encapsulation 2 Private property

    constructor(emailAddress) { // Constructor 2
        super();
        this.#emailAddress = emailAddress;
    }

    // method2
    getEmail() {
        return this.#emailAddress;
    }

    // Polymorphism 1 Overridden sendNotice
    sendNotice(tenantName, amount) {
        console.log(`[EMAIL] Sent to ${this.#emailAddress}: Dear ${tenantName}, your total bill is ₱${amount}.`);
        return true;
    }
}

// class4 (Tenant Management)
class Tenant {
    constructor(name, baseRent, utilities) { // Constructor #3
        this.name = name;
        this.baseRent = baseRent;
        this.utilities = utilities;
        this.status = "Pending";
    }

    //method3
    calculateTotalBill() {
        let total = this.baseRent;
        //loop1
        for (const util of this.utilities) {
            total += util.cost;
        }
        return total;
    }
}

// Class Management Operations
class Landlord {

    // method4
    calcUtilityShare(billAmount, totalTenants) {
        return billAmount / totalTenants;
    }

    // method5
    applyEarlyBirdDiscount(rent, daysEarly) {
        // conditonal1
        if (daysEarly >= 5) {
            return rent - 200; // ₱200 discount for paying 5+ days early
        }
        return rent;
    }

    // method6
    issueMonthlyBill(tenantRecord, notifier) {
        let totalBill = tenantRecord.calculateTotalBill();

        // conditional3
        if (notifier.sendNotice(tenantRecord.name, totalBill)) {
            tenantRecord.status = boardingHouseConfig.activeStatus;
            console.log(`Billing Status (${tenantRecord.name}): ${tenantRecord.status}`);
        } else {
            tenantRecord.status = boardingHouseConfig.overdueStatus;
        }
    }
}

// obj literals and variables

// Object Literal 1 & Var 1
const boardingHouseConfig = {
    propertyName: "Kiechayen Boarding House",
    activeStatus: "BILLED",
    overdueStatus: "OVERDUE"
};

// Object Literal 2 & Var 2
const discountPolicy = {
    policyName: "Early Payment Discount",
    active: true
};

// var3 (Log tracking)
let systemAuditLog = [];

// arrays

// arr1 Utilities List
const monthlyUtilities = [
    { type: "Water", cost: 150 },
    { type: "Electricity", cost: 500 },
    { type: "Wi-Fi", cost: 200 }
];

// arr2 Tenant's Selected Utilities
const assignedUtilities = [monthlyUtilities[0], monthlyUtilities[1], monthlyUtilities[2]];

//  obj instantation

// obj1 SMS Notifier
const smsNotifier = new SMSNotification("09171234567");

// obj2 Email Notifier
const emailNotifier = new EmailNotification("tenant@kiechayen.com");

// obj3: Tenant Instance
const tenantRecord = new Tenant("Mike Rongcales", 3500, assignedUtilities);

// obj4 Landlord Manager Instance
const houseManager = new Landlord();

// arr3 collection of polymorphic services
const activeNotifiers = [smsNotifier, emailNotifier];

// prog execution

console.log(`==========================================`);
console.log(`   ${boardingHouseConfig.propertyName.toUpperCase()} MANAGEMENT SYSTEM`);
console.log(`==========================================\n`);

// conditional3
if (discountPolicy.active) {
    console.log(`Active Promotion: ${discountPolicy.policyName}\n`);
}

//  loop2 standard for-loop
for (let i = 0; i < tenantRecord.utilities.length; i++) {
    // reading utility costs
}

// loop3 dispatching
for (let j = 0; j < activeNotifiers.length; j++) {
    console.log(`--- Dispatching Notification #${j + 1} ---`);
    houseManager.issueMonthlyBill(tenantRecord, activeNotifiers[j]);
    
    systemAuditLog.push(`Notice #${j + 1} dispatched for ${tenantRecord.name}`);
    console.log("");
}

console.log("System Audit Log:", systemAuditLog);