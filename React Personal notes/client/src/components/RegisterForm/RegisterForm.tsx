import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { RegisterFormType, RegisterFormSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const RegisterForm: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema)
  });

  const registrationMutation = useMutation({
    mutationFn: (data: { username: string, email: string, password: string }) => registerUser(data.username, data.email, data.password),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] })
    }
  }, queryClient)

  return (
    <form className="register-form" onSubmit={handleSubmit((data) => {
      registrationMutation.mutate({ username: data.username, email: data.email, password: data.password });
    })}>
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input
          type="text"
          {...register("username")}
        />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input
          type="email"
          {...register("email")}
        />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
          type="password"
          {...register("password")}
        />
      </FormField>
      {registrationMutation.error && <span className="register-form__error">{registrationMutation.error.message}</span>}
      <Button type="submit" isLoading={registrationMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};