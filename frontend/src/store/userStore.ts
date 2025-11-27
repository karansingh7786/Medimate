import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
}

interface UserStore {
  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  clearUser: () => void;
  isAuthenticated: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user, token) => {
        set({ user, token });
        localStorage.setItem('token', token);
      },
      clearUser: () => {
        set({ user: null, token: null });
        localStorage.removeItem('token');
      },
      isAuthenticated: () => {
        return !!get().user && !!get().token;
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
