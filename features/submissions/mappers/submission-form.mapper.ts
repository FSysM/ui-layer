import { Assignments } from '@/features/assignments/types/assignments.types';
import { Submissions, SubmissionFormModel } from '../types/submissions.types';

export function assignmentToForm(assignment: Assignments): SubmissionFormModel {
	return {
		assignmentId: assignment.id,
		topic: assignment.topic,
		type: assignment.type,
		faculty: assignment.faculty,
		department: assignment.department,
		annotation: assignment.annotation ?? '',
		literature: '',
		fileUrl: '',
	};
}

export function submissionToForm(submission: Submissions): SubmissionFormModel {
	return {
		assignmentId: submission.assignment.id,
		topic: submission.assignment.topic,
		type: submission.assignment.type,
		faculty: submission.assignment.faculty,
		department: submission.assignment.department,
		annotation: submission.assignment.annotation ?? '',
		literature: submission.literature ?? '',
		fileUrl: submission.fileUrl ?? '',
	};
}

export function emptySubmissionForm(): SubmissionFormModel {
	return {
		assignmentId: '',
		topic: '',
		type: '',
		faculty: '',
		department: '',
		annotation: '',
		literature: '',
		fileUrl: '',
	};
}
