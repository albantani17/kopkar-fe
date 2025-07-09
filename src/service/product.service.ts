import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constant";
import { ICreateProduct, IUpdateProduct } from "@/types/Product";

const productService = {
  find: (params?: string) => instance.get(`${endpoint.PRODUCTS}?${params}`),
  findOne: (id: string) => instance.get(`${endpoint.PRODUCTS}/${id}`),
  create: (payload: ICreateProduct) =>
    instance.post(`${endpoint.PRODUCTS}`, payload),
  update: (id: string, payload: IUpdateProduct) =>
    instance.patch(`${endpoint.PRODUCTS}/${id}`, payload),
  delete: (id: string) => instance.delete(`${endpoint.PRODUCTS}/${id}`),
};

export default productService;
