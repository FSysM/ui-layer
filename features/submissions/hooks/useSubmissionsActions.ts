import { Submissions } from '../types/submissions.types';

type Role = 'TEACHER' | 'STUDENT';

export function createSubmissionsActions(
	role?: Role,
	setEditing?: (a: Submissions) => void,
	setOpen?: (v: boolean) => void,
	remove?: (id: string) => void,
) {
	const actions = [];

	if (role === 'STUDENT' && setEditing && setOpen && remove) {
		actions.push(
			{
				label: 'Edit',
				onClick: (row: Submissions) => {
					setEditing(row);
					setOpen(true);
				},
			},
			{
				label: 'Delete',
				onClick: (row: Submissions) => remove(row.id),
			},
		);
	}
	return actions;
}
