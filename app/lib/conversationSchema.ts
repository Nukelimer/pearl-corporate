import z from "zod";

export const conversationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\d{8,15}$/, "Please enter a valid phone number (8-15 digits)"),
  message: z
    .string()
    .min(10, "Brief of Enquiry must be at least 10 characters"),
  availability: z.object({
    day: z.date({ required_error: "Select a day" }),
    time: z.string().min(1, "Select a time slot"),
  }),
});
export type ConversationFormData = z.infer<typeof conversationSchema>;
