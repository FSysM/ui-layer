export type User = {
  id: string
  username: string
  role: string
}

export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  access_token: string
  user: User
}