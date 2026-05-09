import { useMutation } from '@tanstack/react-query'
import { loginService } from '../services/login.service'
import { useAuthStore } from '../store/auth.store'
import { useRouter } from 'next/navigation'


export function useLogin() {
  const router = useRouter()
  const setAuth = useAuthStore(state => state.setAuth)

  return useMutation({
    mutationFn: loginService,

    onSuccess: (data) => {
      setAuth(
        data.user,
        data.access_token
      )
      // redirect
      router.push('/dashboard/home')
    },

    onError: (error) => {
      console.error(error)
    }
    
  })
}