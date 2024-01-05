/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `chapters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chapters_title_key" ON "chapters"("title");
