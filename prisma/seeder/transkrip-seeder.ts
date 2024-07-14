import { PrismaClient } from "@prisma/client";

export default async (
  prisma: PrismaClient,
  mahasiswa: string,
  mataKuliah: string,
  nilai: string
) => {
  const krs = await prisma.transkrip.create({
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
      nilai: {
        connect: {
          id: nilai,
        },
      },
    },
  });

  console.log(krs);
  return krs;
};
