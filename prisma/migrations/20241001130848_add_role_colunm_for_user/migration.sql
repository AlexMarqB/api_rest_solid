-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "tb_user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
