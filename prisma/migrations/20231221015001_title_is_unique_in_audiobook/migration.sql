/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `audiobooks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "audiobooks_title_key" ON "audiobooks"("title");
