import { api } from '@/lib/api';

export async function getSubmissions() {
	const res = await api.get('/submissions');
	return res.data;
}
