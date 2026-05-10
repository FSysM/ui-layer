import { create } from 'zustand';
import { User } from '../types/auth.types';

type AuthStore = {
	user: User | null;
	setAuth: (user: User, token: string) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,

	setAuth: (user, token) => {
		sessionStorage.setItem('accessToken', token);
		set({ user });
	},

	logout: () => {
		sessionStorage.removeItem('accessToken');
		set({ user: null });
	},
}));
