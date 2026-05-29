import { redirect } from 'next/navigation';
import { fetchCurrentUser } from '@/lib/server-auth';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const user = await fetchCurrentUser();
  if (!user) redirect('/login');
  return <HomeClient />;
}
