export type User = {
	id: string;
	username: string;
	name?: string;
	role: 'STUDENT' | 'TEACHER' | 'GUEST';
};

export type LoginRequest = {
	username: string;
	password: string;
};

export type LoginResponse = {
	accessToken: string;
	user: User;
};

export type AuthStore = {
	user: User | null;
	isGuest: boolean;

	setAuth: (user: User, token: string) => void;
	setGuest: () => void;
	logout: () => void;
};
