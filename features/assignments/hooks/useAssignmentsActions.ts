import { Assignments } from '../types/assignments.types';

type Role = 'TEACHER' | 'STUDENT';

export function createAssignmentActions(
	role: Role,
	openEdit: (a: Assignments) => void,
	remove: (id: string) => void,
	pick: (id: string) => void,
	unpick: (id: string) => void,
) {
	if (role === 'TEACHER') {
		return [
			{ label: 'Edit', onClick: (row: Assignments) => openEdit(row) },
			{ label: 'Delete', onClick: (row: Assignments) => remove(row.id) },
		];
	}

	if (role === 'STUDENT') {
		return [
			{ label: 'Pick', onClick: (row: Assignments) => pick(row.id) },
			{ label: 'Unpick', onClick: (row: Assignments) => unpick(row.id) },
		];
	}

	return [];
}
