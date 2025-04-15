import { pgTable, unique, varchar, foreignKey, integer, timestamp, numeric, text, serial, boolean, date, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const cropType = pgEnum("crop_type", ['vegetable', 'fruit', 'grain', 'herb', 'spice', 'other'])
export const disputeStatus = pgEnum("dispute_status", ['open', 'investigating', 'resolved', 'closed'])
export const disputeType = pgEnum("dispute_type", ['quality', 'delivery', 'payment', 'other'])
export const orderStatus = pgEnum("order_status", ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
export const orderType = pgEnum("order_type", ['standard', 'express', 'rental', 'subscription'])
export const queryStatus = pgEnum("query_status", ['unsolved', 'in_progress', 'solved'])
export const role = pgEnum("role", ['admin', 'manager', 'support'])
export const userRole = pgEnum("user_role", ['user', 'admin'])
export const userType = pgEnum("user_type", ['farmer', 'customer', 'vendor', 'admin'])


export const admins = pgTable("admins", {
	adminId: varchar("admin_id", { length: 50 }).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 100 }).notNull(),
	role: role().notNull(),
}, (table) => [
	unique("admins_email_unique").on(table.email),
]);

export const farmerCustomerOrders = pgTable("farmer_customer_orders", {
	orderId: varchar("order_id", { length: 50 }).primaryKey().notNull(),
	farmerId: varchar("farmer_id", { length: 50 }).notNull(),
	customerId: varchar("customer_id", { length: 50 }).notNull(),
	cropId: varchar("crop_id", { length: 50 }).notNull(),
	orderType: orderType("order_type").notNull(),
	orderStatus: orderStatus("order_status"),
	quantity: integer().default(1).notNull(),
	orderDate: timestamp("order_date", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.farmerId],
			foreignColumns: [farmers.farmerId],
			name: "farmer_customer_orders_farmer_id_farmers_farmer_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customers.customerId],
			name: "farmer_customer_orders_customer_id_customers_customer_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.cropId],
			foreignColumns: [crops.cropId],
			name: "farmer_customer_orders_crop_id_crops_crop_id_fk"
		}).onDelete("cascade"),
]);

export const farmerCustomerTransactions = pgTable("farmer_customer_transactions", {
	transactionId: varchar("transaction_id", { length: 50 }).primaryKey().notNull(),
	orderId: varchar("order_id", { length: 50 }).notNull(),
	paymentMode: varchar("payment_mode", { length: 50 }),
	amount: numeric({ precision: 10, scale:  2 }).default('0').notNull(),
	transactionTimestamp: timestamp("transaction_timestamp", { mode: 'string' }).defaultNow().notNull(),
	commission: numeric({ precision: 10, scale:  2 }),
});

export const farmerCustomerFeedbacks = pgTable("farmer_customer_feedbacks", {
	feedbackId: varchar("feedback_id", { length: 50 }).primaryKey().notNull(),
	orderId: varchar("order_id", { length: 50 }).notNull(),
	farmerId: varchar("farmer_id", { length: 50 }),
	customerId: varchar("customer_id", { length: 50 }),
	rating: integer().notNull(),
	comments: text(),
	feedbackTimestamp: timestamp("feedback_timestamp", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.farmerId],
			foreignColumns: [farmers.farmerId],
			name: "farmer_customer_feedbacks_farmer_id_farmers_farmer_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customers.customerId],
			name: "farmer_customer_feedbacks_customer_id_customers_customer_id_fk"
		}).onDelete("set null"),
]);

export const customers = pgTable("customers", {
	customerId: varchar("customer_id", { length: 50 }).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	contactInfo: varchar("contact_info", { length: 50 }).notNull(),
	address: text().notNull(),
	profileCreationDate: timestamp("profile_creation_date", { mode: 'string' }).defaultNow().notNull(),
	username: text().notNull(),
	password: text().notNull(),
}, (table) => [
	unique("customers_username_unique").on(table.username),
]);

export const crops = pgTable("crops", {
	cropId: varchar("crop_id", { length: 50 }).primaryKey().notNull(),
	type: varchar({ length: 50 }).notNull(),
	quantity: integer().default(0).notNull(),
	price: numeric({ precision: 10, scale:  2 }).default('0').notNull(),
	description: text(),
	name: text(),
});

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 100 }).notNull(),
	password: varchar({ length: 100 }).notNull(),
	role: userRole().default('user').notNull(),
	userType: userType("user_type").default('customer').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	lastLogin: timestamp("last_login", { mode: 'string' }),
	darkMode: boolean("dark_mode").default(false),
}, (table) => [
	unique("users_username_unique").on(table.username),
	unique("users_email_unique").on(table.email),
]);

export const farmerCustomerDisputes = pgTable("farmer_customer_disputes", {
	disputeId: varchar("dispute_id", { length: 50 }).primaryKey().notNull(),
	orderId: varchar("order_id", { length: 50 }).notNull(),
	disputeType: disputeType("dispute_type").notNull(),
	disputeStatus: disputeStatus("dispute_status"),
	details: text(),
	resolutionDate: date("resolution_date"),
});

export const products = pgTable("products", {
	productId: varchar("product_id", { length: 50 }).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	type: varchar({ length: 50 }).notNull(),
	description: text(),
	price: numeric({ precision: 10, scale:  2 }).default('0').notNull(),
	quantity: integer().default(0).notNull(),
	classification: varchar({ length: 50 }),
});

export const vendorFarmerFeedbacks = pgTable("vendor_farmer_feedbacks", {
	feedbackId: varchar("feedback_id", { length: 50 }).primaryKey().notNull(),
	orderId: varchar("order_id", { length: 50 }).notNull(),
	farmerId: varchar("farmer_id", { length: 50 }),
	vendorId: varchar("vendor_id", { length: 50 }),
	rating: integer().notNull(),
	comments: text(),
	feedbackTimestamp: timestamp("feedback_timestamp", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.farmerId],
			foreignColumns: [farmers.farmerId],
			name: "vendor_farmer_feedbacks_farmer_id_farmers_farmer_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [vendors.vendorId],
			name: "vendor_farmer_feedbacks_vendor_id_vendors_vendor_id_fk"
		}).onDelete("set null"),
]);

export const vendorFarmerTransactions = pgTable("vendor_farmer_transactions", {
	transactionId: varchar("transaction_id", { length: 50 }).primaryKey().notNull(),
	orderId: varchar("order_id", { length: 50 }).notNull(),
	paymentMode: varchar("payment_mode", { length: 50 }),
	amount: numeric({ precision: 10, scale:  2 }).default('0').notNull(),
	transactionTimestamp: timestamp("transaction_timestamp", { mode: 'string' }).defaultNow().notNull(),
	commission: numeric({ precision: 10, scale:  2 }),
});

export const vendors = pgTable("vendors", {
	vendorId: varchar("vendor_id", { length: 50 }).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	businessDetails: text("business_details").notNull(),
	contactInfo: varchar("contact_info", { length: 50 }).notNull(),
	address: text().notNull(),
	profileCreationDate: timestamp("profile_creation_date", { mode: 'string' }).defaultNow().notNull(),
	username: text().notNull(),
	password: text().notNull(),
}, (table) => [
	unique("vendors_username_unique").on(table.username),
]);

export const farmers = pgTable("farmers", {
	farmerId: varchar("farmer_id", { length: 50 }).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	contactInfo: varchar("contact_info", { length: 50 }).notNull(),
	address: text().notNull(),
	farmType: varchar("farm_type", { length: 50 }),
	cropsGrown: text("crops_grown"),
	profileCreationDate: timestamp("profile_creation_date", { mode: 'string' }).defaultNow().notNull(),
	username: text().notNull(),
	password: text().notNull(),
}, (table) => [
	unique("farmers_username_unique").on(table.username),
]);

export const vendorFarmerOrders = pgTable("vendor_farmer_orders", {
	orderId: varchar("order_id", { length: 50 }).primaryKey().notNull(),
	vendorId: varchar("vendor_id", { length: 50 }).notNull(),
	farmerId: varchar("farmer_id", { length: 50 }).notNull(),
	productId: varchar("product_id", { length: 50 }).notNull(),
	orderType: orderType("order_type").notNull(),
	orderStatus: orderStatus("order_status"),
	quantity: integer().default(1).notNull(),
	orderDate: timestamp("order_date", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [vendors.vendorId],
			name: "vendor_farmer_orders_vendor_id_vendors_vendor_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.farmerId],
			foreignColumns: [farmers.farmerId],
			name: "vendor_farmer_orders_farmer_id_farmers_farmer_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.productId],
			name: "vendor_farmer_orders_product_id_products_product_id_fk"
		}).onDelete("cascade"),
]);

export const vendorFarmerDisputes = pgTable("vendor_farmer_disputes", {
	disputeId: varchar("dispute_id", { length: 50 }).primaryKey().notNull(),
	orderId: varchar("order_id", { length: 50 }).notNull(),
	disputeType: disputeType("dispute_type").notNull(),
	disputeStatus: disputeStatus("dispute_status"),
	details: text(),
	resolutionDate: date("resolution_date"),
});

export const productComplaints = pgTable("product_complaints", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	productId: varchar("product_id", { length: 50 }).notNull(),
	vendorId: varchar("vendor_id", { length: 50 }).notNull(),
	title: varchar({ length: 100 }).notNull(),
	description: text().notNull(),
	status: queryStatus().default('unsolved').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	vendorResponse: text("vendor_response"),
	responseDate: timestamp("response_date", { mode: 'string' }),
});

export const vendorProducts = pgTable("vendor_products", {
	vendorId: varchar("vendor_id", { length: 50 }).notNull(),
	productId: varchar("product_id", { length: 50 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [vendors.vendorId],
			name: "vendor_products_vendor_id_vendors_vendor_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.productId],
			name: "vendor_products_product_id_products_product_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.vendorId, table.productId], name: "vendor_products_vendor_id_product_id_pk"}),
]);

export const farmerCrops = pgTable("farmer_crops", {
	farmerId: varchar("farmer_id", { length: 50 }).notNull(),
	cropId: varchar("crop_id", { length: 50 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.farmerId],
			foreignColumns: [farmers.farmerId],
			name: "farmer_crops_farmer_id_farmers_farmer_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.cropId],
			foreignColumns: [crops.cropId],
			name: "farmer_crops_crop_id_crops_crop_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.farmerId, table.cropId], name: "farmer_crops_farmer_id_crop_id_pk"}),
]);

export const farmerInventories = pgTable("farmer_inventories", {
	farmerId: varchar("farmer_id", { length: 50 }).notNull(),
	cropId: varchar("crop_id", { length: 50 }).notNull(),
	stockLevel: integer("stock_level").default(0).notNull(),
	lowStockNotification: boolean("low_stock_notification").default(false),
}, (table) => [
	foreignKey({
			columns: [table.farmerId],
			foreignColumns: [farmers.farmerId],
			name: "farmer_inventories_farmer_id_farmers_farmer_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.cropId],
			foreignColumns: [crops.cropId],
			name: "farmer_inventories_crop_id_crops_crop_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.farmerId, table.cropId], name: "farmer_inventories_farmer_id_crop_id_pk"}),
]);

export const vendorInventories = pgTable("vendor_inventories", {
	vendorId: varchar("vendor_id", { length: 50 }).notNull(),
	productId: varchar("product_id", { length: 50 }).notNull(),
	stockLevel: integer("stock_level").default(0).notNull(),
	lowStockNotification: boolean("low_stock_notification").default(false),
}, (table) => [
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [vendors.vendorId],
			name: "vendor_inventories_vendor_id_vendors_vendor_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.productId],
			name: "vendor_inventories_product_id_products_product_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.vendorId, table.productId], name: "vendor_inventories_vendor_id_product_id_pk"}),
]);
