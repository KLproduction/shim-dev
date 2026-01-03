import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  company: z.string().optional().or(z.literal("")),
  message: z.string().min(1, "Tell us about the project"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
