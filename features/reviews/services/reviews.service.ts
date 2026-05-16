import { api } from '@/lib/api';

export async function getReviews() {
	const res = await api.get('/reviews');
	return res.data;
}

export async function createReview(data: any) {
	const res = await api.post('/reviews', data);
	return res.data;
}

export async function updateReview(data: any) {
	const res = await api.put('/reviews', data);
	return res.data;
}

export async function deleteReview(id: string) {
	const res = await api.delete('/reviews', { data: { id } });
	return res.data;
}
