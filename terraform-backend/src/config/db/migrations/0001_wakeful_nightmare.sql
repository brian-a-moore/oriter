CREATE TABLE IF NOT EXISTS "security_questions" (
	"question_id" uuid PRIMARY KEY NOT NULL,
	"question" varchar(256) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "admin" ADD COLUMN "question_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "admin" ADD COLUMN "question_response" text NOT NULL;--> statement-breakpoint
ALTER TABLE "funeral_home" ADD COLUMN "question_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "funeral_home" ADD COLUMN "question_response" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin" ADD CONSTRAINT "admin_question_id_security_questions_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "security_questions"("question_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "funeral_home" ADD CONSTRAINT "funeral_home_question_id_security_questions_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "security_questions"("question_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
