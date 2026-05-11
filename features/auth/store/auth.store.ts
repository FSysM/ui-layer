import { create } from 'zustand';
import { AuthStore } from '../types/auth.types';

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	isGuest: false,

	setAuth: (user, token) => {
		sessionStorage.setItem('accessToken', token);
		set({ user, isGuest: false });
	},

	setGuest: () => {
		set({
			user: { id: 'guest', username: 'guest', name: 'Guest', role: 'GUEST' },
			isGuest: true,
		});
	},

	logout: () => {
		sessionStorage.removeItem('accessToken');
		set({ user: null, isGuest: false });
	},
}));
