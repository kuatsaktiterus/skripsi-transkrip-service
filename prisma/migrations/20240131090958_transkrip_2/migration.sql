/*
  Warnings:

  - You are about to drop the column `transkripId` on the `MataKuliah` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mahasiswaId,mataKuliahId]` on the table `Transkrip` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[MataKuliah] DROP COLUMN [transkripId];

-- CreateIndex
ALTER TABLE [dbo].[Transkrip] ADD CONSTRAINT [Transkrip_mahasiswaId_mataKuliahId_key] UNIQUE NONCLUSTERED ([mahasiswaId], [mataKuliahId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
