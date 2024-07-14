export type Paging = {
  meta: {
    current_page: string;
    last_page: number;
    per_page: string;
    total: number;
  }
}

export type ErrorResponse = {
  code: number;
  status: string;
  errors?: string | object;
}

export type GetTranskripResponse = {
  id: string;
  mahasiswa: {
    id: string
    nim: string;
    nama: string;
    email: string;
    jurusanId: string;
    semesterId: string;
    statusId: string;
    statusPembayaranSemester: boolean,
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  },
  mataKuliah: {
    id: string;
    kode_mk: string;
    nama_mk: string;
    sks: number,
    createdAt: Date;
    updatedAt: Date;
  },
  nilai: {
    id: string;
    nilai: string;
    bobot: number,
    createdAt: Date;
    updatedAt: Date;
  }
}

export type TranskripResponse = {
  id: string;
  mahasiswaId: string;
  mataKuliahId: string;
  nilaiId: string;
  createdAt: Date;
  updatedAt: Date;

}
