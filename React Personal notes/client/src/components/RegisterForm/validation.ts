import { z } from "zod";

export const RegisterFormSchema = z.object({
  username: z.string().min(5, "Имя должно быть не менее 5 символов").max(20, "Имя должно быть не более 20 символов"),
  email: z.string().email("Некоректный email"),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов")
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;