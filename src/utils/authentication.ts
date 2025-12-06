import type { LoginCredentials } from "../types/login/loginCredentials";
import type { User } from "../types/login/user";

const AUTH_STORAGE_KEY = 'auth_user';
const USERNAME = 'admin';
const PASSWORD = '1234';

const getAuthUser = (): User | null => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  }

  return null;
};

const generateInitials = (username: string): string => {
  const parts = username.split(/[._-]/);
  return parts.map(part => part[0]).join().toUpperCase()
};

export const isAuthenticated = (): boolean => {
  return getAuthUser() !== null;
};

export const authenticateUser = (credentials: LoginCredentials): boolean => {
  if(credentials.username !== USERNAME || credentials.password !== PASSWORD)
  {
    return false;
  }

  const user: User = {
    initials: generateInitials(credentials.username),
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  return true
}
