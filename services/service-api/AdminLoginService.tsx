import { backendApi } from "../backend-api-clients/backendApi";

export interface LoginStaticResponse {
  UserName: string;
  Password: string;
}

export const AdminLoginService = async () => {
  try {
    const response = await backendApi().get<LoginStaticResponse[]>(
      `/api/user/SignIn/LoginStatic`
    );
    return response.data;
  } catch (error) {
    console.log("Error", error)
    return [];
  }
}
