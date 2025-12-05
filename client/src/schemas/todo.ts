import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(5, "Title should be at least 5 characters"),
  description: z.string().min(5, "Description should be at least 5 characters"),
});

export type todoSchemaT = z.infer<typeof todoSchema>;
