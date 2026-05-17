import { api } from '@/lib/api'

export type Teacher = { id: string; name: string | null }

export async function getTeachers(): Promise<Teacher[]> {
  const res = await api.get('/users/teachers')
  return res.data
}
