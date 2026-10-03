// 10 const variables
const store_name = "TechVault Electronics";
const tax_rate = 0.12;
const standard_shipping_fee = 15.00;
const express_shipping_fee = 35.00;
const discount_threshold = 500;
const default_currency = "USD";
const max_items_per_order = 10;
const vip_discount_rate = 0.15;
const support_email = "support@techvault.com";
const system_version = "2.4.0";

// 10 let variables
let current_order_count = 1420;
let total_daily_revenue = 8450.50;
let active_user_session = "sess_987654321";
let selected_shipping_type = "express";
let applied_promo_code = "VIPFALL2026";
let is_system_maintenance = false;
let current_tax_amount = 0;
let grand_total = 0;
let audit_log_status = "Initialized";
let total_processed_items = 0;

// sample data
const tech_products = [
  { id: 101, name: "Wireless Headphones", price: 150, category: "Audio", specs: { battery: "20h" } },
  { id: 102, name: "Mechanical Keyboard", price: 120, category: "Peripherals", specs: { switch: "Red" } },
  { id: 103, name: "Gaming Mouse", price: 80, category: "Peripherals" },
  { id: 104, name: "4K Monitor", price: 450, category: "Displays", specs: { refreshRate: "144Hz" } },
  { id: 105, name: "USB-C Hub", price: 45, category: "Accessories" }
];

const home_products = [
  { id: 201, name: "Smart Desk Lamp", price: 60, category: "Home" },
  { id: 202, name: "Ergonomic Chair", price: 300, category: "Furniture" }
];

// 2 arrays using spread operators
const catalog_items = [...tech_products, ...home_products];
const updated_catalog = [...catalog_items, { id: 203, name: "Standing Desk", price: 500, category: "Furniture" }];

// base config objects
const base_store_config = { theme: "dark", itemsPerPage: 20, autoSave: true };
const notification_config = { emailAlerts: true, smsAlerts: false };

// 2 object literals using spread operator
const store_settings = { ...base_store_config, ...notification_config, language: "en-US" };
const updated_settings = { ...store_settings, itemsPerPage: 50, theme: "light" };

// customer data for optional chaining
const customer_a = {
  id: "CUST-881",
  profile: { name: "Alex Rivera", membership: { level: "VIP" } },
  history: { totalOrders: 12 }
};

const customer_b = {
  id: "CUST-882",
  profile: { name: "Jordan Lee" }
};

// 5 arrow functions
const calculate_tax = (price, rate) => price * rate;
const format_currency = (amount, symbol = "$") => `${symbol}${amount.toFixed(2)}`;
const apply_discount = (total, discount_rate) => total - (total * discount_rate);
const generate_order_ref = (prefix, id) => `${prefix}-${id}-${Math.floor(Math.random() * 1000)}`;
const create_summary_log = (cust_name, total, item_count) => 
  `order completed for ${cust_name}: ${item_count} item(s) processed for a total of ${format_currency(total)}.`;

// 3 destructured arrays
const [top_product, second_product, third_product] = catalog_items;
const [first_home_item, second_home_item] = home_products;
const [primary_tech_item, ...remaining_tech_items] = tech_products;

// 3 destructured object literals
const { theme: current_theme, emailAlerts } = store_settings;
const { name: top_product_name, price: top_product_price } = top_product;
const { id: customer_id, profile: customer_profile } = customer_a;

// 2 arrays using .map()
const product_price_tags = catalog_items.map(item => `${item.name}: $${item.price}`);
const discounted_prices = catalog_items.map(item => ({
  ...item,
  salePrice: item.price * 0.9
}));

// 2 arrays using .filter()
const premium_items = catalog_items.filter(item => item.price >= 100);
const peripheral_items = catalog_items.filter(item => item.category === "Peripherals");

// 2 object literals using optional chaining
const customer_a_membership = customer_a.profile?.membership?.level;
const customer_b_membership = customer_b.profile?.membership?.level;

// order processing logic
current_order_count++;
const selected_shipping_fee = selected_shipping_type === "express" ? express_shipping_fee : standard_shipping_fee;
const subtotal = top_product_price + second_product.price;
current_tax_amount = calculate_tax(subtotal, tax_rate);
grand_total = subtotal + current_tax_amount + selected_shipping_fee;
total_processed_items = 2;

// 10 template literals
const t_lit1 = `welcome to ${store_name} system v${system_version}`;
const t_lit2 = `active admin session: ${active_user_session}`;
const t_lit3 = `top featured item: ${top_product_name} priced at ${format_currency(top_product_price)}`;
const t_lit4 = `secondary item: ${second_product.name} priced at ${format_currency(second_product.price)}`;
const t_lit5 = `customer ${customer_profile.name} (${customer_id}) status: ${customer_a_membership}`;
const t_lit6 = `secondary customer status: ${customer_b.profile.name} status: ${customer_b_membership ?? "standard"}`;
const t_lit7 = `order ref: ${generate_order_ref("ORD", current_order_count)}`;
const t_lit8 = `subtotal: ${format_currency(subtotal)} | tax (${tax_rate * 100}%): ${format_currency(current_tax_amount)} | shipping: ${format_currency(selected_shipping_fee)}`;
const t_lit9 = `grand total for order #${current_order_count}: ${format_currency(grand_total)}`;
const t_lit10 = `audit status: [${audit_log_status}] - ${create_summary_log(customer_profile.name, grand_total, total_processed_items)}`;

// execution output
console.log(t_lit1);
console.log(t_lit2);
console.log(t_lit3);
console.log(t_lit4);
console.log(t_lit5);
console.log(t_lit6);
console.log(t_lit7);
console.log(t_lit8);
console.log(t_lit9);
console.log(t_lit10);