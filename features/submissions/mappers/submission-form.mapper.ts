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
    topic: submission.topic,
    type: submission.type,
    faculty: submission.faculty,
    department: submission.department,
    annotation: submission.annotation ?? '',
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
