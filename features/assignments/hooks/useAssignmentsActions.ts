import { Assignments } from '../types/assignments.types';

type Role = 'TEACHER' | 'STUDENT';

export function createAssignmentActions(
	role: Role,
	setEditing: (a: Assignments) => void,
	setOpen: (v: boolean) => void,
	remove: (id: string) => void,
	pick: (id: string) => void,
	unpick: (id: string) => void,
) {
	const actions = [];

	if (role === 'TEACHER') {
		actions.push(
			{
				label: 'Edit',
				onClick: (row: Assignments) => {
					setEditing(row);
					setOpen(true);
				},
			},
			{
				label: 'Delete',
				onClick: (row: Assignments) => remove(row.id),
			},
		);
	}

	if (role === 'STUDENT') {
		actions.push(
			{
				label: 'Pick',
				onClick: (row: Assignments) => pick(row.id),
			},
			{
				label: 'Unpick',
				onClick: (row: Assignments) => unpick(row.id),
			},
		);
	}

	return actions;
}
