/*
  Warnings:

  - The primary key for the `Urls` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Urls" DROP CONSTRAINT "Urls_createrId_fkey";

-- AlterTable
ALTER TABLE "Urls" DROP CONSTRAINT "Urls_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "createrId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Urls_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Urls_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Urls" ADD CONSTRAINT "Urls_createrId_fkey" FOREIGN KEY ("createrId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
