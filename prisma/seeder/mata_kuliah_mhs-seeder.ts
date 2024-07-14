import { PrismaClient } from "@prisma/client";

export default async (
  prisma: PrismaClient,
  mahasiswa: string,
  mataKuliah: string
) => {
  const krs = await prisma.mataKuliah_mhs.create({
    data: {
      mahasiswa: {
        connect: {
          id: mahasiswa,
        },
      },
      mataKuliah: {
        connect: {
          id: mataKuliah,
        },
      },
      tahunAjar: "2020/2021",
    },
  });

  console.log(krs);
  return krs;
};
