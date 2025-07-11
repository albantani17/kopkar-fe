import { IKaryawan } from "./Karyawan";

export enum JenisPengajuan {
  PEMINJAMAN = "peminjaman",
  PENGAMBILAN_SIMPANAN = "pengambilan_simpanan",
}

export interface IPengajuan {
  id?: string;
  user?: IKaryawan;
  jenisPengajuan?: JenisPengajuan;
  jumlah?: number;
  alasan?: string;
  status?: string;
  alasanDitolak?: string;
  noRekening?: string;
}

export interface IUpdateStatusPengajuan {
  status: string;
  alasanDitolak?: string;
}
