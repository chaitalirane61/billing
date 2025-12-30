import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(8),
  businessName: z.string().optional(),
  heardAboutUs: z.string().min(1),
  message: z.string().min(10),
});

export const subscribeSchema = z.object({
  email: z.string().email(),
});

export const adminLoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});
