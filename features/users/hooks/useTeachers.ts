import { useQuery } from '@tanstack/react-query'
import { getTeachers, type Teacher } from '../services/users.service'

export function useTeachers() {
  return useQuery<Teacher[]>({
    queryKey: ['teachers'],
    queryFn: getTeachers,
  })
}
