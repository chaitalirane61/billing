import { createApiClient } from "./apiClient";

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("token");
  }
  return null;
};

// Local Next.js API base URL (empty string for relative paths)
const baseURL = '';

const localApi = () => createApiClient(baseURL, getToken);

export { localApi };
