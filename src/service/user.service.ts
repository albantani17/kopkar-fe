import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constant";
import { ICreateKaryawan, IUpdateKaryawan } from "@/types/Karyawan";

const userServices = {
  getAll: (params?: string) => instance.get(`${endpoint.USERS}?${params}`),
  create: (payload: ICreateKaryawan) =>
    instance.post(`${endpoint.USERS}`, payload),
  update: (id: string, payload: IUpdateKaryawan) =>
    instance.patch(`${endpoint.USERS}/${id}`, payload),
  delete: (id: string) => instance.delete(`${endpoint.USERS}/${id}`),
  get: (id: string) => instance.get(`${endpoint.USERS}/${id}`),
};

export default userServices;
