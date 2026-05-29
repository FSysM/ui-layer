export type User = {
  id: string;
  username: string;
  name?: string;
  role: 'STUDENT' | 'TEACHER' | 'GUEST';
};

export type FullUser = {
  id: string;
  username: string;
  email: string;
  name?: string;
  role: 'STUDENT' | 'TEACHER';
  phone?: string;
  address?: string;
  profilePicture?: string;
};

export type UpdateProfileData = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  profilePicture?: string;
};

export type AuthStore = {
  user: User | null;
  isGuest: boolean;

  setAuth: (user: User) => void;
  setGuest: () => void;
  logout: () => void;
};
