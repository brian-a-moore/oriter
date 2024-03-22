CREATE TABLE IF NOT EXISTS "admin" (
	"admin_id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar(128) NOT NULL,
	"last_name" varchar(128) NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"customer_id" uuid PRIMARY KEY NOT NULL,
	"funeral_home_id" uuid NOT NULL,
	"first_name" varchar(128) NOT NULL,
	"last_name" varchar(128) NOT NULL,
	"email" varchar(64) NOT NULL,
	"phone_number" varchar(10) NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "customer_email_unique" UNIQUE("email"),
	CONSTRAINT "customer_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "form_response" (
	"response_id" uuid PRIMARY KEY NOT NULL,
	"customer_id" uuid NOT NULL,
	"bio" json,
	"education" json,
	"employment" json,
	"family" json,
	"info" json,
	"service" json,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "funeral_home" (
	"funeral_home_id" uuid PRIMARY KEY NOT NULL,
	"address_line_1" varchar(256) NOT NULL,
	"address_line_2" varchar(128),
	"city" varchar(128) NOT NULL,
	"state" varchar(2) NOT NULL,
	"zip_code" varchar(5) NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" text NOT NULL,
	"phone_number" varchar(10) NOT NULL,
	"funeral_home_name" varchar(256) NOT NULL,
	"first_name" varchar(128) NOT NULL,
	"last_name" varchar(128) NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "funeral_home_email_unique" UNIQUE("email"),
	CONSTRAINT "funeral_home_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customer" ADD CONSTRAINT "customer_funeral_home_id_funeral_home_funeral_home_id_fk" FOREIGN KEY ("funeral_home_id") REFERENCES "funeral_home"("funeral_home_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_response" ADD CONSTRAINT "form_response_customer_id_customer_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
