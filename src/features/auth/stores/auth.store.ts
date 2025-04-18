import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../services/auth.interface";
import { AuthService } from "../services/auth.service";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (
    service: AuthService,
    email: string,
    password: string
  ) => Promise<void>;
  logout: (service: AuthService) => Promise<void>;
  register: (
    service: AuthService,
    email: string,
    password: string
  ) => Promise<void>;
  getCurrentUser: (service: AuthService) => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      login: async (service, email, password) => {
        set({ isLoading: true });
        try {
          const user = await service.login(email, password);
          set({ user, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      logout: async (service) => {
        set({ isLoading: true });
        try {
          await service.logout();
          set({ user: null, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      register: async (service, email, password) => {
        set({ isLoading: true });
        try {
          const user = await service.register(email, password);
          set({ user, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      getCurrentUser: async (service) => {
        set({ isLoading: true });
        try {
          const user = await service.getCurrentUser();
          set({ user, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      setUser: (user) => {
        set({ user });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
