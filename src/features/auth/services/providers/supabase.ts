import { AuthProvider, User } from "../auth.interface";
import { createClient } from "../auth.client";
import { logger } from "logger";

export class SupabaseAuth implements AuthProvider {
  private supabase = createClient();

  async login(email: string, password: string): Promise<User> {
    logger.info({ email }, "Attempting login with Supabase");
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      logger.error({ error }, "Login failed");
      throw new Error(error.message);
    }
    logger.info({ userId: data.user!.id }, "Login successful");
    return {
      id: data.user!.id,
      email: data.user!.email!,
    };
  }

  async logout(): Promise<void> {
    logger.info("Logging out from Supabase");
    await this.supabase.auth.signOut();
    logger.info("Logout successful");
  }

  async getCurrentUser(): Promise<User | null> {
    logger.info("Fetching current user from Supabase");
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      logger.error({ error }, "Failed to fetch current user");
      throw new Error(error.message);
    }
    if (data.user) {
      logger.info(
        { userId: data.user.id },
        "Current user fetched successfully"
      );
      return {
        id: data.user.id,
        email: data.user.email!,
      };
    }
    logger.info("No user is currently logged in");
    return null;
  }

  async register(email: string, password: string): Promise<User> {
    logger.info({ email }, "Registering with Supabase");
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      logger.error({ error }, "Registration failed");
      throw new Error(error.message);
    }
    logger.info({ data }, "User registered successfully");
    return {
      id: data.user!.id,
      email: data.user!.email!,
    };
  }
}
