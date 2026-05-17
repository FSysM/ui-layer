import { api } from '@/lib/api';
import { SubmissionsFormData, EditSubmissionsFormData } from '../schemas/submissions.schema';

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

export async function updateSubmission(data: EditSubmissionsFormData & { id: string }) {
  const res = await api.put('/submissions', data);
  return res.data;
}

export async function deleteSubmission(id: string) {
  const res = await api.delete('/submissions', { data: { id } });
  return res.data;
}

export async function approveSubmission(data: { id: string; opponentId: string }) {
  const res = await api.post('/submissions/approve', data);
  return res.data;
}

export async function rejectSubmission(id: string) {
  const res = await api.post('/submissions/reject', { id });
  return res.data;
}
