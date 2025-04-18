import { describe, it, expect, vi } from "vitest";
import { AuthProvider, User } from "./auth.interface";
import { AuthService } from "./auth.service";

const mockUser: User = {
  id: "123",
  email: "test@example.com",
};

const mockAuthProvider: AuthProvider = {
  register: vi.fn().mockResolvedValue(mockUser),
  login: vi.fn().mockResolvedValue(mockUser),
  logout: vi.fn().mockResolvedValue(undefined),
  getCurrentUser: vi.fn().mockResolvedValue(mockUser),
};

describe("AuthService - Registro", () => {
  it("debe registrar un usuario correctamente", async () => {
    const authService = new AuthService(mockAuthProvider);

    const result = await authService.register(mockUser.email, "password123");

    expect(mockAuthProvider.register).toHaveBeenCalledWith(
      mockUser.email,
      "password123"
    );

    expect(result).toEqual(mockUser);
  });

  it("debe manejar errores de registro", async () => {
    const errorMessage = "Email ya registrado";
    const errorAuthProvider: AuthProvider = {
      ...mockAuthProvider,
      register: vi.fn().mockRejectedValue(new Error(errorMessage)),
    };
    const authService = new AuthService(errorAuthProvider);

    await expect(
      authService.register(mockUser.email, "password123")
    ).rejects.toThrow(errorMessage);
  });
});

describe("AuthService - Login", () => {
  it("debe iniciar sesión correctamente", async () => {
    const authService = new AuthService(mockAuthProvider);

    const result = await authService.login(mockUser.email, "password123");

    expect(mockAuthProvider.login).toHaveBeenCalledWith(
      mockUser.email,
      "password123"
    );

    expect(result).toEqual(mockUser);
  });

  it("debe manejar errores de inicio de sesión", async () => {
    const errorMessage = "Credenciales inválidas";
    const errorAuthProvider: AuthProvider = {
      ...mockAuthProvider,
      login: vi.fn().mockRejectedValue(new Error(errorMessage)),
    };
    const authService = new AuthService(errorAuthProvider);

    await expect(
      authService.login(mockUser.email, "wrongpassword")
    ).rejects.toThrow(errorMessage);
  });
});

describe("AuthService - Logout", () => {
  it("debe cerrar sesión correctamente", async () => {
    const authService = new AuthService(mockAuthProvider);

    await authService.logout();

    expect(mockAuthProvider.logout).toHaveBeenCalled();
  });

  it("debe manejar errores de cierre de sesión", async () => {
    const errorMessage = "Error al cerrar sesión";
    const errorAuthProvider: AuthProvider = {
      ...mockAuthProvider,
      logout: vi.fn().mockRejectedValue(new Error(errorMessage)),
    };
    const authService = new AuthService(errorAuthProvider);

    await expect(authService.logout()).rejects.toThrow(errorMessage);
  });
});

describe("AuthService - Obtener usuario actual", () => {
  it("debe obtener el usuario actual correctamente", async () => {
    const authService = new AuthService(mockAuthProvider);

    const result = await authService.getCurrentUser();

    expect(mockAuthProvider.getCurrentUser).toHaveBeenCalled();

    expect(result).toEqual(mockUser);
  });

  it("debe manejar errores al obtener el usuario actual", async () => {
    const errorMessage = "Error al obtener el usuario actual";
    const errorAuthProvider: AuthProvider = {
      ...mockAuthProvider,
      getCurrentUser: vi.fn().mockRejectedValue(new Error(errorMessage)),
    };
    const authService = new AuthService(errorAuthProvider);

    await expect(authService.getCurrentUser()).rejects.toThrow(errorMessage);
  });
});
