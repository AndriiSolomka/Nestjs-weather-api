/*
  Warnings:

  - You are about to drop the column `current` on the `weather_data` table. All the data in the column will be lost.
  - Added the required column `data` to the `weather_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "weather_data" DROP COLUMN "current",
ADD COLUMN     "data" JSONB NOT NULL;
