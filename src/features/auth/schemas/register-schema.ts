import { z } from "zod";

export const registerSchemaMessages = {
  email: {
    required_error: "El correo es obligatorio",
    invalid_type_error: "El correo no es válido",
  },
  password: {
    required_error: "La contraseña es obligatoria",
    min: "La contraseña debe tener al menos 6 caracteres",
    max: "La contraseña no puede tener más de 32 caracteres",
  },
  confirmPassword: {
    required_error: "Debes confirmar la contraseña",
    mismatch: "Las contraseñas no coinciden",
  },
};

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: registerSchemaMessages.email.required_error })
      .min(1, registerSchemaMessages.email.required_error)
      .email(registerSchemaMessages.email.invalid_type_error),
    password: z
      .string({
        required_error: registerSchemaMessages.password.required_error,
      })
      .min(6, registerSchemaMessages.password.min)
      .max(32, registerSchemaMessages.password.max),
    confirmPassword: z.string({
      required_error: registerSchemaMessages.confirmPassword.required_error,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: registerSchemaMessages.confirmPassword.mismatch,
    path: ["confirmPassword"],
  });

export const registerDefaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export type RegisterFormType = z.infer<typeof registerSchema>;
