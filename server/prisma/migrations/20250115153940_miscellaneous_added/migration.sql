-- AlterTable
ALTER TABLE "_SubredditToUser" ADD CONSTRAINT "_SubredditToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_SubredditToUser_AB_unique";

-- CreateTable
CREATE TABLE "Miscellaneous" (
    "id" SERIAL NOT NULL,
    "photo_links" TEXT NOT NULL,

    CONSTRAINT "Miscellaneous_pkey" PRIMARY KEY ("id")
);
