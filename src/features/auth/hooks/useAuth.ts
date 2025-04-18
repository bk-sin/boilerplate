import { AuthService } from "../services/auth.service";
import { SupabaseAuth } from "../services/providers/supabase";
import { useAuthStore } from "../stores/auth.store";

export const useAuth = () => {
  const store = useAuthStore();
  const service = new AuthService(new SupabaseAuth());

  return {
    user: store.user,
    isLoading: store.isLoading,
    error: store.error,
    login: (email: string, password: string) =>
      store.login(service, email, password),
    logout: () => store.logout(service),
    register: (email: string, password: string) =>
      store.register(service, email, password),
  };
};
