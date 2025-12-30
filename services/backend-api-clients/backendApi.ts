import { createApiClient } from "@/api-client";
import config from "../../public/webconfig.js";

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("token");
  }
  return null;
};

const baseURL = config.endpoints.backendUrl;

const backendApi = () => createApiClient(baseURL, getToken);

export { backendApi };
