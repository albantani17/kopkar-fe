import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constant";

const formHaeder = {
  "Content-Type": "multipart/form-data",
};

const uploadService = {
  uploadFile: (payload: FormData) =>
    instance.post(`${endpoint.UPLOAD}/upload`, payload, {
      headers: formHaeder,
    }),
  deleteFile: (filename: string) =>
    instance.delete(`${endpoint.UPLOAD}/delete`, { data: { filename } }),
};

export default uploadService;
