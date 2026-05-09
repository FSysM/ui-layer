export type User = {
  id: string
  username: string
  name?: string
  role: 'STUDENT' | 'TEACHER' | 'GUEST'
}

export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  user: User
}