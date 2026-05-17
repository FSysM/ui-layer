import { Submissions } from '../types/submissions.types';

type Role = 'TEACHER' | 'STUDENT';

export function createSubmissionsActions(
	role: Role,
	openEdit: (a: Submissions) => void,
	remove: (id: string) => void,
) {
	if (role === 'STUDENT') {
		return [
			{ label: 'Edit', onClick: (row: Submissions) => openEdit(row) },
			{ label: 'Delete', onClick: (row: Submissions) => remove(row.id) },
		];
	}

	return [];
}
