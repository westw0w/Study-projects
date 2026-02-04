import { z } from "zod"
import { validateResponse } from "./validateResponse";


const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(3, "Имя пользователя должно быть не менее 3 символов"),
})


export type User = z.infer<typeof UserSchema>

export function registerUser(username: string, email: string, password: string): Promise<void> {
  return fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function login(email: string, password: string): Promise<void> {
  return fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, }),
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function logout(): Promise<void> {
  return fetch("/api/logout", {
    method: "POST",
  })
    .then(validateResponse)
    .then(() => undefined);
}


export function fetchMe(): Promise<User> {
  return fetch("/api/users/me")
    .then(validateResponse)
    .then(response => response.json())
    .then((data) => UserSchema.parse(data))
}