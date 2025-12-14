import z from "zod";

export const applySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\d{8,15}$/, "Please enter a valid phone number (8-15 digits)"),
  yog: z.string().min(10, "Year of graduation is required"),
  availability: z.object({
    day: z.date({ required_error: "Select a day" }),
    time: z.string().min(1, "Select a time slot"),
  }),
});
export type ApplyFormData = z.infer<typeof applySchema>;
