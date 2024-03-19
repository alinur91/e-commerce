import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(10, "Name must be at most 10 characters"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export type TSignInSchema = z.infer<typeof signInSchema>;

export type Credentials = {
  email: string;
  password: string;
  name?: string;
};

export type UserData = {
  name: string | null;
  email: string | null;
  photoURL: string | null;
};

export type User = {
  email: string;
  name: string;
  photoURL: string;
};

export type AuthState = {
  loggedInUser: User | null;
  loading: boolean;
  error: string | null | undefined;
};
