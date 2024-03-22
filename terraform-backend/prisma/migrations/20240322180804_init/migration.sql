-- CreateTable
CREATE TABLE "admins" (
    "adminId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "securityQuestionId" INTEGER NOT NULL,
    "securityAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "customers" (
    "customerId" TEXT NOT NULL,
    "funeralHomeId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "loved_ones" (
    "lovedOneId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "bio" JSONB NOT NULL,
    "education" JSONB NOT NULL,
    "employment" JSONB NOT NULL,
    "family" JSONB NOT NULL,
    "info" JSONB NOT NULL,
    "service" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "loved_ones_pkey" PRIMARY KEY ("lovedOneId")
);

-- CreateTable
CREATE TABLE "funeral_homes" (
    "funeralHomeId" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "securityQuestionId" INTEGER NOT NULL,
    "securityAnswer" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "funeralHomeName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funeral_homes_pkey" PRIMARY KEY ("funeralHomeId")
);

-- CreateTable
CREATE TABLE "security_questions" (
    "securityQuestionId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,

    CONSTRAINT "security_questions_pkey" PRIMARY KEY ("securityQuestionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_securityQuestionId_fkey" FOREIGN KEY ("securityQuestionId") REFERENCES "security_questions"("securityQuestionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_funeralHomeId_fkey" FOREIGN KEY ("funeralHomeId") REFERENCES "funeral_homes"("funeralHomeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loved_ones" ADD CONSTRAINT "loved_ones_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funeral_homes" ADD CONSTRAINT "funeral_homes_securityQuestionId_fkey" FOREIGN KEY ("securityQuestionId") REFERENCES "security_questions"("securityQuestionId") ON DELETE RESTRICT ON UPDATE CASCADE;
