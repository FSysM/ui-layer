import { Assignments } from '../types/assignments.types';

export function createAssignmentActions(
	setEditing: (a: Assignments) => void,
	setOpen: (v: boolean) => void,
	remove: (id: string) => void,
) {
	return [
		{
			label: 'Edit',
			onClick: (row: Assignments) => {
				setEditing(row);
				setOpen(true);
			},
		},
		{
			label: 'Delete',
			onClick: (row: Assignments) => {
				remove(row.id);
			},
		},
	];
}
