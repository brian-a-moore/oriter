-- DropForeignKey
ALTER TABLE "funeral_homes" DROP CONSTRAINT "funeral_homes_securityQuestionId_fkey";

-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "securityAnswer" DROP NOT NULL;

-- AlterTable
ALTER TABLE "funeral_homes" ALTER COLUMN "securityQuestionId" DROP NOT NULL,
ALTER COLUMN "securityAnswer" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "funeral_homes" ADD CONSTRAINT "funeral_homes_securityQuestionId_fkey" FOREIGN KEY ("securityQuestionId") REFERENCES "security_questions"("securityQuestionId") ON DELETE SET NULL ON UPDATE CASCADE;
