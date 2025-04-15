ALTER TABLE "crops" ALTER COLUMN "type" SET DATA TYPE crop_type;--> statement-breakpoint
ALTER TABLE "crops" ALTER COLUMN "type" SET DEFAULT 'other';--> statement-breakpoint
ALTER TABLE "crops" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "crops" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "crops" ADD COLUMN "image_path" text;--> statement-breakpoint
ALTER TABLE "crops" ADD COLUMN "season" varchar(50);--> statement-breakpoint
ALTER TABLE "crops" ADD COLUMN "growth_period" integer;--> statement-breakpoint
ALTER TABLE "crops" ADD COLUMN "farmer_id" integer;--> statement-breakpoint
ALTER TABLE "crops" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "crops" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "vendor_id" varchar(50);--> statement-breakpoint
ALTER TABLE "farmer_customer_transactions" ADD CONSTRAINT "farmer_customer_transactions_order_id_farmer_customer_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."farmer_customer_orders"("order_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farmer_customer_feedbacks" ADD CONSTRAINT "farmer_customer_feedbacks_order_id_farmer_customer_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."farmer_customer_orders"("order_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crops" ADD CONSTRAINT "crops_farmer_id_users_id_fk" FOREIGN KEY ("farmer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "farmer_customer_disputes" ADD CONSTRAINT "farmer_customer_disputes_order_id_farmer_customer_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."farmer_customer_orders"("order_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_farmer_feedbacks" ADD CONSTRAINT "vendor_farmer_feedbacks_order_id_vendor_farmer_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."vendor_farmer_orders"("order_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_farmer_transactions" ADD CONSTRAINT "vendor_farmer_transactions_order_id_vendor_farmer_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."vendor_farmer_orders"("order_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor_farmer_disputes" ADD CONSTRAINT "vendor_farmer_disputes_order_id_vendor_farmer_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."vendor_farmer_orders"("order_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_complaints" ADD CONSTRAINT "product_complaints_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_complaints" ADD CONSTRAINT "product_complaints_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_complaints" ADD CONSTRAINT "product_complaints_vendor_id_vendors_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendors"("vendor_id") ON DELETE cascade ON UPDATE no action;