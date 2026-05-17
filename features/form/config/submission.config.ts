import {
	submissionsSchema,
	editSubmissionsSchema,
} from '@/features/submissions/schemas/submissions.schema';
import { Assignments } from '@/features/assignments/types/assignments.types';

export function createSubmissionFormConfig(
	assignments: Assignments[],
	onAssignmentSelect: (id: string) => void,
) {
	return {
		title: 'Create Submission',
		schema: submissionsSchema,
		defaultValues: {
			assignmentId: '',
			topic: '',
			type: '',
			faculty: '',
			department: '',
			annotation: '',
			literature: '',
			fileUrl: '',
		},
		fields: [
			{
				type: 'select',
				name: 'assignmentId',
				label: 'Assignment',
				options: assignments.map((a) => ({ label: a.topic, value: a.id })),
				onSelect: onAssignmentSelect,
			},
			{ type: 'readonly', name: 'topic', label: 'Topic' },
			{ type: 'readonly', name: 'type', label: 'Type' },
			{ type: 'readonly', name: 'faculty', label: 'Faculty' },
			{ type: 'readonly', name: 'department', label: 'Department' },
			{ type: 'readonly', name: 'annotation', label: 'Annotation' },
			{ type: 'input', name: 'literature', label: 'Literature' },
			{ type: 'input', name: 'fileUrl', label: 'File URL' },
		],
	};
}

export const editSubmissionFormConfig = {
	title: 'Edit Submission',
	schema: editSubmissionsSchema,
	defaultValues: {
		literature: '',
		fileUrl: '',
	},
	fields: [
		{ type: 'input', name: 'literature', label: 'Literature' },
		{ type: 'input', name: 'fileUrl', label: 'File URL' },
	],
};
