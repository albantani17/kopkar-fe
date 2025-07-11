import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constant";
import { IUpdateStatusPengajuan } from "@/types/Pengajuan";

const pengajuanService = {
  find: (params?: string) => instance.get(`${endpoint.PENGAJUAN}?${params}`),
  findOne: (id: string) => instance.get(`${endpoint.PENGAJUAN}/${id}`),
  create: (payload: any) => instance.post(endpoint.PENGAJUAN, payload),
  update: (id: string, payload: any) =>
    instance.patch(`${endpoint.PENGAJUAN}/${id}`, payload),
  updateStatus: (id: string, payload: IUpdateStatusPengajuan) =>
    instance.patch(`${endpoint.PENGAJUAN}/${id}/status`, payload),
  delete: (id: string) => instance.delete(`${endpoint.PENGAJUAN}/${id}`),
};

export default pengajuanService;
