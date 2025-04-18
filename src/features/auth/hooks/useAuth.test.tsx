import { renderHook, act } from "@testing-library/react";
import { useAuth } from "./useAuth";
import { useAuthStore } from "../stores/auth.store";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock del store (sin await import)
vi.mock("../stores/auth.store", () => ({
  useAuthStore: vi.fn(),
}));

// Mock del servicio y provider
vi.mock("../services/auth.service", () => ({
  AuthService: vi.fn().mockImplementation(() => ({})),
}));
vi.mock("../services/providers/supabase", () => ({
  SupabaseAuth: vi.fn(),
}));

describe("useAuth", () => {
  const mockStore = {
    user: { id: "1", email: "test@example.com" },
    isLoading: false,
    error: null,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
  };

  beforeEach(() => {
    (useAuthStore as unknown as vi.Mock).mockReturnValue(mockStore);
    vi.clearAllMocks();
  });

  it("debe exponer user, isLoading y error del store", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toEqual(mockStore.user);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("debe llamar a login del store", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login("mail", "pass");
    });
    expect(mockStore.login).toHaveBeenCalled();
  });

  it("debe llamar a register del store", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.register("mail", "pass");
    });
    expect(mockStore.register).toHaveBeenCalled();
  });

  it("debe llamar a logout del store", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.logout();
    });
    expect(mockStore.logout).toHaveBeenCalled();
  });

  it("debe exponer el error del store si ocurre un error", () => {
    const errorStore = {
      ...mockStore,
      error: "Credenciales inválidas",
    };
    (useAuthStore as unknown as vi.Mock).mockReturnValue(errorStore);

    const { result } = renderHook(() => useAuth());
    expect(result.current.error).toBe("Credenciales inválidas");
  });

  it("llama a login con email y password correctos", async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login("foo@bar.com", "1234");
    });
    expect(mockStore.login).toHaveBeenCalledWith(
      expect.anything(),
      "foo@bar.com",
      "1234"
    );
  });

  it("refleja cambios en el usuario del store", () => {
    const firstUser = { id: "1", email: "a@a.com" };
    const secondUser = { id: "2", email: "b@b.com" };
    (useAuthStore as unknown as vi.Mock).mockReturnValueOnce({
      ...mockStore,
      user: firstUser,
    });
    const { result, rerender } = renderHook(() => useAuth());
    expect(result.current.user).toEqual(firstUser);

    (useAuthStore as unknown as vi.Mock).mockReturnValueOnce({
      ...mockStore,
      user: secondUser,
    });
    rerender();
    expect(result.current.user).toEqual(secondUser);
  });
});
