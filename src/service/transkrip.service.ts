import { Request } from "express";
import { prisma } from "../lib/prisma-client";
import { GetTranskripResponse, Paging, TranskripResponse } from "../controller/controller";

export class transkripService {
  static async get(req: Request): Promise<[GetTranskripResponse[], Paging]> {
    const { current_page = 1, per_page = 2 } = req.query;

    const [totalTranskrip, transkrip] = await prisma.$transaction([
      prisma.transkrip.count(),
      prisma.transkrip.findMany({
        skip: Number(per_page) * (Number(current_page) - 1),
        take: Number(per_page),
        select: {
          id: true,
          mahasiswa: true,
          mataKuliah: true,
          nilai: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const paging = this.toPaginate(String(current_page), String(per_page), totalTranskrip);

    return [
      transkrip,
      {
        meta: paging,
      },
    ];
  }

  static async getById(req: Request): Promise<GetTranskripResponse> {
    const { id } = req.params;
    return await prisma.transkrip.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        mahasiswa: true,
        mataKuliah: true,
        nilai: true,
      },
    });
  }

  static async getByIdMahasiswa(req: Request): Promise<GetTranskripResponse[]> {
    const { id_mahasiswa } = req.params;
    return await prisma.transkrip.findMany({
      where: { mahasiswa: { id: id_mahasiswa } },
      select: {
        id: true,
        mahasiswa: true,
        mataKuliah: true,
        nilai: true,
      },
    });
  }

  static async post(req: Request): Promise<TranskripResponse> {
    const { id_mahasiswa, id_mataKuliah, id_nilai } = req.body;
    return await prisma.transkrip.create({
      data: {
        mahasiswa: {
          connect: {
            id: id_mahasiswa,
          },
        },
        mataKuliah: {
          connect: {
            id: id_mataKuliah,
          },
        },
        nilai: {
          connect: {
            id: id_nilai,
          },
        },
      },
    });
  }

  static async put(req: Request): Promise<TranskripResponse> {
    const { id, id_mahasiswa, id_mataKuliah, id_nilai } = req.body;
    return await prisma.transkrip.update({
      where: {
        id,
      },
      data: {
        mahasiswa: {
          connect: {
            id: id_mahasiswa,
          },
        },
        mataKuliah: {
          connect: {
            id: id_mataKuliah,
          },
        },
        nilai: {
          connect: {
            id: id_nilai,
          },
        },
      },
    });
  }

  static async delete(req: Request): Promise<string> {
    const { id } = req.query;
    await prisma.transkrip.delete({ where: { id: String(id) } });
    return "Success to delete data jurusan";
  }

  static toPaginate(current_page: string, per_page: string, total: number) {
    return {
      current_page: current_page,
      last_page: Math.ceil(Number(total) / Number(per_page)),
      per_page: per_page,
      total: total,
    }
  }
}
