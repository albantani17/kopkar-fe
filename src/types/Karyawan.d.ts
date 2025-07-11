export interface IKaryawan {
  id?: string;
  nik?: string;
  name?: string;
  cabang?: string;
  departemen?: string;
  email?: string;
  phone?: string;
  role?: string;
  simpanan?: number;
  pinjaman?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateKaryawan {
  nik: string;
  password: string;
  confirmPassword?: string;
  name: string;
  cabang: string;
  departemen: string;
  email: string;
  phone: string;
  role: strinsg;
}

export interface IUpdateKaryawan {
  nik?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  simpanan?: number | string;
  pinjaman?: number | string;
  password?: string;
  confirmPassword?: string;
}
