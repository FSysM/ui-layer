import { api } from '@/lib/api';
import { SubmissionsFormData } from '../schemas/submissions.schema';

export async function getAllSubmissions() {
	const res = await api.get('/submissions/all');
	return res.data;
}

export async function getSubmissions() {
	const res = await api.get('/submissions');
	return res.data;
}

export async function createSubmission(data: SubmissionsFormData) {
	const res = await api.post('/submissions', data);
	return res.data;
}

export async function updateSubmission(data: SubmissionsFormData) {
	const res = await api.put('/submissions', data);
	return res.data;
}

export async function deleteSubmission(id: string) {
	const res = await api.delete('/submissions', { data: { id } });
	return res.data;
}
