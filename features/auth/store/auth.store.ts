import { create } from 'zustand';
import { AuthStore, User } from '../types/auth.types';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isGuest: false,

  setAuth: (user: User) => {
    set({ user, isGuest: false });
  },

  setGuest: () => {
    if (typeof document !== 'undefined') {
      document.cookie = 'guest-session=1; path=/; max-age=86400';
    }
    set({
      user: { id: 'guest', username: 'guest', name: 'Guest', role: 'GUEST' },
      isGuest: true,
    });
  },

  logout: () => {
    if (typeof document !== 'undefined') {
      document.cookie = 'guest-session=; path=/; max-age=0';
    }
    set({ user: null, isGuest: false });
  },
}));
