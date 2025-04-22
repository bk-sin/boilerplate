import { useForm } from "react-hook-form";
import { AuthService } from "../services/auth.service";
import { SupabaseAuth } from "../services/providers/supabase";
import { useAuthStore } from "../stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginDefaultValues,
  LoginFormType,
  loginSchema,
} from "../schemas/login-schema";
import {
  registerDefaultValues,
  RegisterFormType,
  registerSchema,
} from "../schemas/register-schema";

export const useAuth = () => {
  const store = useAuthStore();
  const service = new AuthService(new SupabaseAuth());

  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const registerForm = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  return {
    user: store.user,
    isLoading: store.isLoading,
    error: store.error,
    login: (email: string, password: string) =>
      store.login(service, email, password),
    logout: () => store.logout(service),
    register: (email: string, password: string) =>
      store.register(service, email, password),
    loginForm,
    registerForm,
  };
};
