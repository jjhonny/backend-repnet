-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('C', 'R');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "shopname" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cnpj_key" ON "users"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
