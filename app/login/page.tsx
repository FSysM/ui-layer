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


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
    <Card className="w-full max-w-sm" >
      <CardHeader>
        <CardTitle>FSysM</CardTitle>
        <CardDescription>Login to the app</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username-rtl">Username</Label>
              <Input
                id="username-rtl"
                type="text"
                placeholder="Username"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password-rtl">Password</Label>
              </div>
              <Input id="password-rtl" type="password" required placeholder="Password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Continue as a guest
        </Button>
      </CardFooter>
      </Card>
      </div>
  )
}
