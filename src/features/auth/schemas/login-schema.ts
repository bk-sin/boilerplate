import { z } from "zod";

const loginSchemaMessages = {
  email: {
    required_error: "El correo es obligatorio",
    invalid_type_error: "El correo no es válido",
  },
  password: {
    required_error: "La contraseña es obligatoria",
    invalid_type_error: "La contraseña no es válida",
    min: "La contraseña debe tener al menos 6 caracteres",
    max: "La contraseña no puede tener más de 32 caracteres",
  },
};

export const loginSchema = z.object({
  email: z
    .string({ required_error: loginSchemaMessages.email.required_error })
    .min(1, loginSchemaMessages.email.required_error)
    .email(loginSchemaMessages.email.invalid_type_error),
  password: z
    .string({ required_error: loginSchemaMessages.password.required_error })
    .min(6, loginSchemaMessages.password.min)
    .max(32, loginSchemaMessages.password.max),
});

export const loginDefaultValues = {
  email: "",
  password: "",
};

export type LoginFormType = z.infer<typeof loginSchema>;
