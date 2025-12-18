/*
  Warnings:

  - Made the column `type` on table `Node` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Node" ALTER COLUMN "type" SET NOT NULL;
