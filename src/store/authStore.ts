import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
  gender?: "boy" | "girl" | null;
  dueDate?: string | null;
  avatar?: string;
};

type AuthState = {
  user: User | null;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthLoading: (value: boolean) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthLoading: true,
  setUser: (user) => set({ user }),
  setAuthLoading: (value) => set({ isAuthLoading: value }),
  clearUser: () => set({ user: null }),
}));