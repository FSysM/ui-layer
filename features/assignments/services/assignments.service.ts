import { api } from '@/lib/api';
import { AssignmentFormData } from '../schemas/assignments.schema';

export async function getAssignments(filter?: string) {
	const res = await api.get('/assignments', { params: filter ? { filter } : undefined });
	return res.data;
}

export async function createAssignment(data: AssignmentFormData) {
	const res = await api.post('/assignments', data);
	return res.data;
}

export async function updateAssignment(data: AssignmentFormData) {
	const res = await api.put('/assignments', data);
	return res.data;
}

export async function deleteAssignment(id: string) {
	const res = await api.delete('/assignments', { data: { id } });
	return res.data;
}

export async function pickAssignment(id: string) {
	const res = await api.post(`/assignments/${id}/pick`);
	return res.data;
}

export async function unpickAssignment(id: string) {
	const res = await api.post(`/assignments/${id}/unpick`);
	return res.data;
}
