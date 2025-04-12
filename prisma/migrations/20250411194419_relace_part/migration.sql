/*
  Warnings:

  - You are about to drop the column `part` on the `weather_data` table. All the data in the column will be lost.
  - Added the required column `exclude` to the `weather_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "weather_data" DROP COLUMN "part",
ADD COLUMN     "exclude" TEXT NOT NULL;
