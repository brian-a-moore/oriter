-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_securityQuestionId_fkey";

-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "securityQuestionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_securityQuestionId_fkey" FOREIGN KEY ("securityQuestionId") REFERENCES "security_questions"("securityQuestionId") ON DELETE SET NULL ON UPDATE CASCADE;
