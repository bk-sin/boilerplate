import { logger } from "logger";
import { AuthProvider } from "./auth.interface";
import { SupabaseAuth } from "./providers/supabase";

export class AuthService {
  constructor(private provider: AuthProvider) {}

  async login(email: string, password: string) {
    try {
      logger.info({ email }, "Intentando login");
      const user = await this.provider.login(email, password);
      logger.info({ user }, "Login exitoso");
      return user;
    } catch (error) {
      logger.error({ error }, "Login error");
      throw error;
    }
  }

  async logout() {
    try {
      logger.info("Intentando logout");
      await this.provider.logout();
      logger.info("Logout exitoso");
    } catch (error) {
      logger.error({ error }, "Logout error");
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      logger.info("Obteniendo usuario actual");
      const user = await this.provider.getCurrentUser();
      logger.info({ user }, "Usuario actual obtenido");
      return user;
    } catch (error) {
      logger.error({ error }, "Get current user error");
      throw error;
    }
  }

  async register(email: string, password: string) {
    try {
      logger.info({ email }, "Intentando registro");
      const user = await this.provider.register(email, password);
      logger.info({ user }, "Registro exitoso");
      return user;
    } catch (error) {
      logger.error({ error }, "Registration error");
      throw error;
    }
  }
}

export const authService = new AuthService(new SupabaseAuth());
