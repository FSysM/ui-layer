import { api } from '@/lib/api';
import { AssignmentFormData } from '../schemas/assignments.schema';

export async function getAssignments() {
	const res = await api.get('/assignments');
	return res.data;
}

export async function createAssignment(data: AssignmentFormData) {
	const res = await api.post('/assignments', data);
	return res.data;
}
