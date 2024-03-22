/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `funeral_homes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `funeral_homes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "funeral_homes_email_key" ON "funeral_homes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "funeral_homes_phoneNumber_key" ON "funeral_homes"("phoneNumber");
