/*
  Warnings:

  - You are about to drop the `UploadedFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UploadedFile";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UploadedMovie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "startedAt" DATETIME,
    "shutteredAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
