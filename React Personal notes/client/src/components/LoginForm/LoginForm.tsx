import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { login } from "../../api/User";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, LoginFormSchema } from "./validation";



export const LoginForm: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema)
  });

  const loginMutation = useMutation({
    mutationFn: (data: { email: string, password: string }) => login(data.email, data.password),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    }
  }, queryClient);

  return (
    <form className="login-form" onSubmit={handleSubmit((data) => {
      loginMutation.mutate({ email: data.email, password: data.password });
    })}>
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
      {loginMutation.error && <span className="login-form__error">{loginMutation.error.message}</span>}
      <Button type="submit" isLoading={loginMutation.isPending}>Войти</Button>
    </form>
  );
};

