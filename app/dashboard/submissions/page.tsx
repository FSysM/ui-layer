import { fetchCurrentUser } from '@/lib/server-auth'
import { SubmissionsClient } from './SubmissionsClient'

export default async function SubmissionsPage() {
  const user = await fetchCurrentUser()
  return <SubmissionsClient user={user} />
}
