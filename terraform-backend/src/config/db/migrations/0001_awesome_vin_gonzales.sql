CREATE TABLE IF NOT EXISTS "admin" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "login_code" (
	"id" uuid PRIMARY KEY NOT NULL,
	"funeral_home_id" uuid NOT NULL,
	"code" text NOT NULL,
	"created_at" timestamp,
	CONSTRAINT "login_code_code_unique" UNIQUE("code")
);
