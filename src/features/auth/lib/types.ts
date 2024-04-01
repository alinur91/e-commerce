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
      .max(8, "Name must be at most 8 characters"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const updatePasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export type TSignInSchema = z.infer<typeof signInSchema>;

export type TUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

export type Credentials = {
  email: string;
  password: string;
  name?: string;
};

export type UserData = Record<
  "name" | "email" | "photoURL" | "uid",
  string | null
>;

export type AuthState = {
  loggedInUser: UserData | null;
  loading: boolean;
  error: string | null;
  avatarActions: AvatarActionsState;
  updatePasswordActions: UpdatePasswordActionsState;
};

export type AvatarActionsState = {
  uploadAvatarLoading: boolean;
  uploadAvatarError: string | null;
  removeAvatarLoading: boolean;
  removeAvatarError: string | null;
};

export type UpdatePasswordActionsState = {
  updatePasswordLoading: boolean;
  updatePasswordError: string | null;
};
