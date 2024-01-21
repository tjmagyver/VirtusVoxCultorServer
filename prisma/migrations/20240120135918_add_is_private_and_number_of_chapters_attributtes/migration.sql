-- AlterTable
ALTER TABLE "audiobooks" ADD COLUMN     "is_private" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "number_of_chapters" INTEGER NOT NULL DEFAULT 1;
