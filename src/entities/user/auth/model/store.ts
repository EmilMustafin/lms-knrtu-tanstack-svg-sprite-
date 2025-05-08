import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthResponse, User } from './types';
import { authApi } from '../api/user-auth-api';

export type AuthStoreState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (data: AuthResponse) => void;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      login: (data) => {
        try {
          set({
            token: data.token,
            user: data.user,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          });
        } catch (error) {
          console.error('Logout error:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
