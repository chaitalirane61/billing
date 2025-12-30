import { adminLoginSchema } from "@/lib/validations";
import { AdminLoginData } from "@/lib/types";

export const adminService = {
  login: async (data: AdminLoginData) => {
    const parsed = adminLoginSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false as const,
        error: parsed.error.flatten(),
      };
    }

    const { username, password } = parsed.data;

    const ADMIN_USER = "admin";
    const ADMIN_PASS = "123456";

    if (username !== ADMIN_USER || password !== ADMIN_PASS) {
      return {
        success: false as const,
        error: "Invalid username or password.",
      };
    }

    return {
      success: true as const,
      token: "FAKE_ADMIN_JWT",
    };
  },
};