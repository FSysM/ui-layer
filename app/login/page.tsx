"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLogin } from '@/features/auth/hooks/useLogin'


export default function LoginPage() {
  const loginMutation = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()
    loginMutation.mutate({
      username,
      password
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
    <Card className="w-full max-w-sm" >
      <CardHeader>
        <CardTitle>FSysM</CardTitle>
        <CardDescription>Login to the app</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username-rtl">Username</Label>
              <Input
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) =>
                  setUsername(e.target.value)
                  }
                />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password-rtl">Password</Label>
              </div>
              <Input
                  type="password"
                  required
                  placeholder="Password"

                  value={password}

                  onChange={(e) =>
                  setPassword(e.target.value)
                  }
                />
            </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-6"
            >

              {loginMutation.isPending
                ? 'Loading...'
                : 'Login'}

            </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          Continue as a guest
        </Button>
      </CardFooter>
      </Card>
      </div>
  )
}
