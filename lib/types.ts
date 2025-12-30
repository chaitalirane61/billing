import {
  contactSchema,
  subscribeSchema,
  adminLoginSchema,
} from "./validations";
import { z } from "zod";

export type ContactFormData = z.infer<typeof contactSchema>;
export type SubscribeData = z.infer<typeof subscribeSchema>;
export type AdminLoginData = z.infer<typeof adminLoginSchema>;
