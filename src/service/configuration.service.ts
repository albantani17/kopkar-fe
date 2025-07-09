import instance from "@/lib/axios/instance";
import endpoint from "./endpoint.constant";
import { IConfiguration } from "@/types/Configuration";

const configurationService = {
  findAll: () => instance.get(endpoint.CONFIGURATION),
  update: (payload: IConfiguration) =>
    instance.patch(`${endpoint.CONFIGURATION}`, payload),
};

export default configurationService;
