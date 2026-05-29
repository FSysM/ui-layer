import { create } from 'zustand';
import { AuthStore, User } from '../types/auth.types';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isGuest: false,

  setAuth: (user: User) => {
    set({ user, isGuest: false });
  },

  setGuest: () => {
    set({ isGuest: true });
  },

  logout: () => {
    set({ user: null, isGuest: false });
  },
}));
