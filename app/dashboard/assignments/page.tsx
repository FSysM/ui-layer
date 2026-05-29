import { fetchCurrentUser } from '@/lib/server-auth'
import { AssignmentsClient } from './AssignmentsClient'

export default async function AssignmentsPage() {
  const user = await fetchCurrentUser()
  return <AssignmentsClient user={user} />
}
