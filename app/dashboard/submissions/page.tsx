import { redirect } from 'next/navigation';
import { fetchCurrentUser } from '@/lib/server-auth';
import { SubmissionsClient } from './SubmissionsClient';

export default async function SubmissionsPage() {
  const user = await fetchCurrentUser();
  if (!user) redirect('/login');
  return <SubmissionsClient user={user} />;
}
