import { api } from '@/lib/api';

export async function getReviews() {
	const res = await api.get('/reviews');
	return res.data;
}
