import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constant";
import { ICreateCategory, IUpdateCategory } from "@/types/Category";

const categoriesService = {
  find: (params?: string) => instance.get(`${endpoint.CATEGORIES}?${params}`),
  findOne: (id: string) => instance.get(`${endpoint.CATEGORIES}/${id}`),
  create: (payload: ICreateCategory) =>
    instance.post(`${endpoint.CATEGORIES}`, payload),
  update: (id: string, payload: IUpdateCategory) =>
    instance.patch(`${endpoint.CATEGORIES}/${id}`, payload),
  delete: (id: string) => instance.delete(`${endpoint.CATEGORIES}/${id}`),
};

export default categoriesService;
