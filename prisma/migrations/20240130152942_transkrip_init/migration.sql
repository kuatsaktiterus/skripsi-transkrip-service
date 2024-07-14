BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Mahasiswa] ADD CONSTRAINT [Mahasiswa_statusPembayaranSemester_df] DEFAULT 1 FOR [statusPembayaranSemester];

-- AlterTable
ALTER TABLE [dbo].[MataKuliah] ADD [transkripId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[Transkrip] (
    [id] NVARCHAR(1000) NOT NULL,
    [mahasiswaId] NVARCHAR(1000) NOT NULL,
    [mataKuliahId] NVARCHAR(1000) NOT NULL,
    [nilaiId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Transkrip_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Transkrip_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Transkrip] ADD CONSTRAINT [Transkrip_mahasiswaId_fkey] FOREIGN KEY ([mahasiswaId]) REFERENCES [dbo].[Mahasiswa]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Transkrip] ADD CONSTRAINT [Transkrip_mataKuliahId_fkey] FOREIGN KEY ([mataKuliahId]) REFERENCES [dbo].[MataKuliah]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Transkrip] ADD CONSTRAINT [Transkrip_nilaiId_fkey] FOREIGN KEY ([nilaiId]) REFERENCES [dbo].[Nilai]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
