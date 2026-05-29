import { api } from '@/lib/api';
import type { UpdateProfileData } from '../types/auth.types';

export async function getMe() {
  const res = await api.get('/auth/me');
  return res.data;
}

export async function updateProfile(data: UpdateProfileData) {
  const res = await api.patch('/users/me', data);
  return res.data;
}
