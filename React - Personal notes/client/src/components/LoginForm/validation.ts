import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("Некоректный email"),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов")
});
export type LoginFormType = z.infer<typeof LoginFormSchema>;