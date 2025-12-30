
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

type TokenProvider = () => string | null;

export function createApiClient(baseURL: string, getToken?: TokenProvider) {
  const client = axios.create({
    baseURL: String(baseURL), // Ensure baseURL is a string
    timeout: 30000,
  });

  // Request interceptor for token
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (getToken) {
      const token = getToken();
      if (token) {
        if (config.headers) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          config.headers = new axios.AxiosHeaders();
          config.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    }
    return config;
  });

  // Response interceptors (optional)
  client.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: any) => {
      console.error("[API Error]", err);
      return Promise.reject(err);
    }
  );

  // Wrapped HTTP methods
  const get = async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await client.get<T>(url, config);
    return wrapResponse(response);
  };

  const post = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await client.post<T>(url, data, config);
    return wrapResponse(response);
  };

  const put = async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await client.put<T>(url, data, config);
    return wrapResponse(response);
  };

  const del = async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await client.delete<T>(url, config);
    return wrapResponse(response);
  };

  return {
    get,
    post,
    put,
    delete: del,
  };
}

function wrapResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
  return {
    data: response.data,
    status: response.status,
    message: response.statusText,
  };
}
