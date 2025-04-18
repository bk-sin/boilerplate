export type User = {
  id: string;
  email: string;
};

export interface AuthProvider {
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
  register: (email: string, password: string) => Promise<User>;
}
