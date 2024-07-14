import { PrismaClient } from "@prisma/client";
import userSeeder from "./seeder/user-seeder";
import jurusanSeeder from "./seeder/jurusan-seeder";
import semesterSeeder from "./seeder/semester-seeder";
import mataKuliahSeeder from "./seeder/mata_kuliah-seeder";
import nilaiSeeder from "./seeder/nilai-seeder";
import semesterJurusanMkSeeder from "./seeder/semesterJurusan_mk-seeder";
import statusKrsSeeder from "./seeder/status_krs-seeder";
import statusMhsSeeder from "./seeder/status_mhs-seeder";
import mataKuliahMhsSeeder from "./seeder/mata_kuliah_mhs-seeder";
import transkripSeeder from "./seeder/transkrip-seeder";

const prisma = new PrismaClient();

async function main() {
  const jurusan = await jurusanSeeder(prisma);
  const statusMhs = await statusMhsSeeder(prisma);
  const semester = await semesterSeeder(prisma);
  const mahasiswa = await userSeeder(
    prisma,
    jurusan.id,
    statusMhs.id,
    semester.id
  );
  const mataKuliah = await mataKuliahSeeder(prisma);
  await semesterJurusanMkSeeder(prisma, jurusan.id, semester.id, mataKuliah.id);
  const nilai = await nilaiSeeder(prisma);
  await statusKrsSeeder(prisma);
  await mataKuliahMhsSeeder(
    prisma,
    mahasiswa.Mahasiswa?.id ?? "",
    mataKuliah.id
  );
  await transkripSeeder(
    prisma,
    mahasiswa.Mahasiswa?.id ?? "",
    mataKuliah.id,
    nilai.id
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
