/*
  Warnings:

  - Added the required column `password_hash` to the `tb_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_user" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "tb_checkin" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" TIMESTAMP(3),

    CONSTRAINT "tb_checkin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_gym" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "tb_gym_pkey" PRIMARY KEY ("id")
);
