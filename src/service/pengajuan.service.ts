import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constant";
import {
  ICreatePengajuanPinjaman,
  ICreatePengajuanSimpanan,
  IUpdateStatusPengajuan,
} from "@/types/Pengajuan";

const pengajuanService = {
  find: (params?: string) => instance.get(`${endpoint.PENGAJUAN}?${params}`),
  findByUser: (params: string) =>
    instance.get(`${endpoint.PENGAJUAN}/user?${params}`),
  findOne: (id: string) => instance.get(`${endpoint.PENGAJUAN}/${id}`),
  createPengajuanSimpanan: (payload: ICreatePengajuanSimpanan) =>
    instance.post(endpoint.PENGAJUAN, {
      ...payload,
      jenisPengajuan: "pengambilan_simpanan",
    }),
  createPengajuanPinjaman: (payload: ICreatePengajuanPinjaman) =>
    instance.post(endpoint.PENGAJUAN, {
      ...payload,
      jenisPengajuan: "peminjaman",
    }),
  update: (id: string, payload: Record<string, unknown>) =>
    instance.patch(`${endpoint.PENGAJUAN}/${id}`, payload),
  updateStatus: (id: string, payload: IUpdateStatusPengajuan) =>
    instance.patch(`${endpoint.PENGAJUAN}/${id}/status`, payload),
  delete: (id: string) => instance.delete(`${endpoint.PENGAJUAN}/${id}`),
};

export default pengajuanService;
