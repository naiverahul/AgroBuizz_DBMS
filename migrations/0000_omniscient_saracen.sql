-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."crop_type" AS ENUM('vegetable', 'fruit', 'grain', 'herb', 'spice', 'other');--> statement-breakpoint
CREATE TYPE "public"."dispute_status" AS ENUM('open', 'investigating', 'resolved', 'closed');--> statement-breakpoint
CREATE TYPE "public"."dispute_type" AS ENUM('quality', 'delivery', 'payment', 'other');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."order_type" AS ENUM('standard', 'express', 'rental', 'subscription');--> statement-breakpoint
CREATE TYPE "public"."query_status" AS ENUM('unsolved', 'in_progress', 'solved');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'manager', 'support');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('farmer', 'customer', 'vendor', 'admin');--> statement-breakpoint
CREATE TABLE "admins" (
	"admin_id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"role" "role" NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "farmer_customer_orders" (
	"order_id" varchar(50) PRIMARY KEY NOT NULL,
	"farmer_id" varchar(50) NOT NULL,
	"customer_id" varchar(50) NOT NULL,
	"crop_id" varchar(50) NOT NULL,
	"order_type" "order_type" NOT NULL,
	"order_status" "order_status",
	"quantity" integer DEFAULT 1 NOT NULL,
	"order_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "farmer_customer_transactions" (
	"transaction_id" varchar(50) PRIMARY KEY NOT NULL,
	"order_id" varchar(50) NOT NULL,
	"payment_mode" varchar(50),
	"amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"transaction_timestamp" timestamp DEFAULT now() NOT NULL,
	"commission" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "farmer_customer_feedbacks" (
	"feedback_id" varchar(50) PRIMARY KEY NOT NULL,
	"order_id" varchar(50) NOT NULL,
	"farmer_id" varchar(50),
	"customer_id" varchar(50),
	"rating" integer NOT NULL,
	"comments" text,
	"feedback_timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"customer_id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"contact_info" varchar(50) NOT NULL,
	"address" text NOT NULL,
	"profile_creation_date" timestamp DEFAULT now() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "customers_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "crops" (
	"crop_id" varchar(50) PRIMARY KEY NOT NULL,
	"type" varchar(50) NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"description" text,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"user_type" "user_type" DEFAULT 'customer' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_login" timestamp,
	"dark_mode" boolean DEFAULT false,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "farmer_customer_disputes" (
	"dispute_id" varchar(50) PRIMARY KEY NOT NULL,
	"order_id" varchar(50) NOT NULL,
	"dispute_type" "dispute_type" NOT NULL,
	"dispute_status" "dispute_status",
	"details" text,
	"resolution_date" date
);
--> statement-breakpoint
CREATE TABLE "products" (
	"product_id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(50) NOT NULL,
	"description" text,
	"price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"classification" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "vendor_farmer_feedbacks" (
	"feedback_id" varchar(50) PRIMARY KEY NOT NULL,
	"order_id" varchar(50) NOT NULL,
	"farmer_id" varchar(50),
	"vendor_id" varchar(50),
	"rating" integer NOT NULL,
	"comments" text,
	"feedback_timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vendor_farmer_transactions" (
	"transaction_id" varchar(50) PRIMARY KEY NOT NULL,
	"order_id" varchar(50) NOT NULL,
	"payment_mode" varchar(50),
	"amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"transaction_timestamp" timestamp DEFAULT now() NOT NULL,
	"commission" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "vendors" (
	"vendor_id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"business_details" text NOT NULL,
	"contact_info" varchar(50) NOT NULL,
	"address" text NOT NULL,
	"profile_creation_date" timestamp DEFAULT now() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "vendors_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "farmers" (
	"farmer_id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"contact_info" varchar(50) NOT NULL,
	"address" text NOT NULL,
	"farm_type" varchar(50),
	"crops_grown" text,
	"profile_creation_date" timestamp DEFAULT now() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "farmers_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "vendor_farmer_orders" (
	"order_id" varchar(50) PRIMARY KEY NOT NULL,
	"vendor_id" varchar(50) NOT NULL,
	"farmer_id" varchar(50) NOT NULL,
	"product_id" varchar(50) NOT NULL,
	"order_type" "order_type" NOT NULL,
	"order_status" "order_status",
	"quantity" integer DEFAULT 1 NOT NULL,
	"order_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vendor_farmer_disputes" (
	"dispute_id" varchar(50) PRIMARY KEY NOT NULL,
	"order_id" varchar(50) NOT NULL,
	"dispute_type" "dispute_type" NOT NULL,
	"dispute_status" "dispute_status",
	"details" text,
	"resolution_date" date
);
--> statement-breakpoint
CREATE TABLE "product_complaints" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"product_id" varchar(50) NOT NULL,
	"vendor_id" varchar(50) NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"status" "query_status" DEFAULT 'unsolved' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"vendor_response" text,
	"response_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "vendor_products" (
	"vendor_id" varchar(50) NOT NULL,
	"product_id" varchar(50) NOT NULL,
	CONSTRAINT "vendor_products_vendor_id_product_id_pk" PRIMARY KEY("vendor_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "farmer_crops" (
	"farmer_id" varchar(50) NOT NULL,
	"crop_id" varchar(50) NOT NULL,
	CONSTRAINT "farmer_crops_farmer_id_crop_id_pk" PRIMARY KEY("farmer_id","crop_id")
);
--> statement-breakpoint
CREATE TABLE "farmer_inventories" (
	"farmer_id" varchar(50) NOT NULL,
	"crop_id" varchar(50) NOT NULL,
	"stock_level" integer DEFAULT 0 NOT NULL,
	"low_stock_notification" boolean DEFAULT false,
	CONSTRAINT "farmer_inventories_farmer_id_crop_id_pk" PRIMARY KEY("farmer_id","crop_id")
);
--> statement-breakpoint
CREATE TABLE "vendor_inventories" (
	"vendor_id" varchar(50) NOT NULL,
	"product_id" varchar(50) NOT NULL,
	"stock_level" integer DEFAULT 0 NOT NULL,
	"low_stock_notification" boolean DEFAULT false,
	CONSTRAINT "vendor_inventories_vendor_id_product_id_pk" PRIMARY KEY("vendor_id","product_id")
);
--> statement-breakpoint
ALTER TABLE "farmer_customer_orders" ADD CONSTRAINT "farmer_customer_orders_farmer_id_farmers_farmer_id_fk" FOREIGN KEY ("farmer_id") REFERENCES "public"."farmers"("farmer_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farmer_customer_orders" ADD CONSTRAINT "farmer_customer_orders_customer_id_customers_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farmer_customer_orders" ADD CONSTRAINT "farmer_customer_orders_crop_id_crops_crop_id_fk" FOREIGN KEY ("crop_id") REFERENCES "public"."crops"("crop_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farmer_customer_feedbacks" ADD CONSTRAINT "farmer_customer_feedbacks_farmer_id_farmers_farmer_id_fk" FOREIGN KEY ("farmer_id") REFERENCES "public"."farmers"("farmer_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farmer_customer_feedbacks" ADD CONSTRAINT "farmer_customer_feedbacks_customer_id_customers_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_farmer_feedbacks" ADD CONSTRAINT "vendor_farmer_feedbacks_farmer_id_farmers_farmer_id_fk" FOREIGN KEY ("farmer_id") REFERENCES "public"."farmers"("farmer_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_farmer_feedbacks" ADD CONSTRAINT "vendor_farmer_feedbacks_vendor_id_vendors_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors"("vendor_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_farmer_orders" ADD CONSTRAINT "vendor_farmer_orders_vendor_id_vendors_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors"("vendor_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_farmer_orders" ADD CONSTRAINT "vendor_farmer_orders_farmer_id_farmers_farmer_id_fk" FOREIGN KEY ("farmer_id") REFERENCES "public"."farmers"("farmer_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_farmer_orders" ADD CONSTRAINT "vendor_farmer_orders_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_products" ADD CONSTRAINT "vendor_products_vendor_id_vendors_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors"("vendor_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_products" ADD CONSTRAINT "vendor_products_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farmer_crops" ADD CONSTRAINT "farmer_crops_farmer_id_farmers_farmer_id_fk" FOREIGN KEY ("farmer_id") REFERENCES "public"."farmers"("farmer_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farmer_crops" ADD CONSTRAINT "farmer_crops_crop_id_crops_crop_id_fk" FOREIGN KEY ("crop_id") REFERENCES "public"."crops"("crop_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farmer_inventories" ADD CONSTRAINT "farmer_inventories_farmer_id_farmers_farmer_id_fk" FOREIGN KEY ("farmer_id") REFERENCES "public"."farmers"("farmer_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farmer_inventories" ADD CONSTRAINT "farmer_inventories_crop_id_crops_crop_id_fk" FOREIGN KEY ("crop_id") REFERENCES "public"."crops"("crop_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_inventories" ADD CONSTRAINT "vendor_inventories_vendor_id_vendors_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors"("vendor_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_inventories" ADD CONSTRAINT "vendor_inventories_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;
*/