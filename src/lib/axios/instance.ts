import environment from "@/config/enviroment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const header = {
  "Content-Type": "Application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers: header,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (config) => {
    const session: SessionExtended | null = await getSession();
    if (session && session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default instance;
