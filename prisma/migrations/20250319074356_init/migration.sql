/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `subSubCategoryId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - The `status` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Choose` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChooseOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SelectedChoose` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubSubCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategory` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "POSTStatus" AS ENUM ('NEW', 'USED', 'OLD');

-- DropForeignKey
ALTER TABLE "Choose" DROP CONSTRAINT "Choose_subSubCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "ChooseOption" DROP CONSTRAINT "ChooseOption_chooseId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_subSubCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostImage" DROP CONSTRAINT "PostImage_postId_fkey";

-- DropForeignKey
ALTER TABLE "SelectedChoose" DROP CONSTRAINT "SelectedChoose_postId_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "SubSubCategory" DROP CONSTRAINT "SubSubCategory_subCategoryId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "deletedAt",
DROP COLUMN "quantity",
DROP COLUMN "subSubCategoryId",
DROP COLUMN "userId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "subCategory" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "POSTStatus" NOT NULL DEFAULT 'NEW';

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Choose";

-- DropTable
DROP TABLE "ChooseOption";

-- DropTable
DROP TABLE "PostImage";

-- DropTable
DROP TABLE "SelectedChoose";

-- DropTable
DROP TABLE "SubCategory";

-- DropTable
DROP TABLE "SubSubCategory";

-- DropEnum
DROP TYPE "PostStatus";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
