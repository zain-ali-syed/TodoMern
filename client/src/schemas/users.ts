import { z } from "zod";

export const registrationLoginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password should be at least 6 characters long"),
});

export type RegistrationLoginSchemaT = z.infer<typeof registrationLoginSchema>;
