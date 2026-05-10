import { api } from '@/lib/api';

export async function getAssignments() {
	const res = await api.get('/assignments');
	return res.data;
}
