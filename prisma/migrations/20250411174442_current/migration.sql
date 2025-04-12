/*
  Warnings:

  - You are about to drop the column `data` on the `weather_data` table. All the data in the column will be lost.
  - Added the required column `current` to the `weather_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "weather_data" DROP COLUMN "data",
ADD COLUMN     "current" JSONB NOT NULL;
