/*
  Warnings:

  - Added the required column `link_purchase` to the `audiobooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audiobooks" ADD COLUMN     "link_purchase" TEXT NOT NULL;
