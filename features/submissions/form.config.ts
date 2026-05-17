import { submissionsSchema, editSubmissionsSchema } from './schemas/submissions.schema'
import type { Assignments } from '@/features/assignments/types/assignments.types'
import type { FormConfig } from '@/features/form/types/form.types'

const typeOptions = [
  { label: 'Bachelor', value: 'bc' },
  { label: 'Master', value: 'mgr' },
  { label: 'PhD', value: 'phd' },
  { label: 'Other', value: 'other' },
]

const facultyOptions = [
  { label: 'PRF', value: 'PRF' },
  { label: 'CHEM', value: 'CHEM' },
]

const departmentOptions = [
  { label: 'Informatics', value: 'Informatics' },
  { label: 'Mathematics', value: 'Mathematics' },
  { label: 'Physics', value: 'Physics' },
  { label: 'Chemistry', value: 'Chemistry' },
]

export function createSubmissionFormConfig(
  assignments: Assignments[],
  onAssignmentSelect: (id: string) => void,
): FormConfig {
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
      { type: 'input', name: 'topic', label: 'Topic' },
      { type: 'select', name: 'type', label: 'Type', options: typeOptions },
      { type: 'select', name: 'faculty', label: 'Faculty', options: facultyOptions },
      { type: 'select', name: 'department', label: 'Department', options: departmentOptions },
      { type: 'textarea', name: 'annotation', label: 'Annotation' },
      { type: 'input', name: 'literature', label: 'Literature' },
      { type: 'input', name: 'fileUrl', label: 'File URL' },
    ],
  }
}

export const editSubmissionFormConfig: FormConfig = {
  title: 'Edit Submission',
  schema: editSubmissionsSchema,
  defaultValues: {
    topic: '',
    type: '',
    faculty: '',
    department: '',
    annotation: '',
    literature: '',
    fileUrl: '',
  },
  fields: [
    { type: 'input', name: 'topic', label: 'Topic' },
    { type: 'select', name: 'type', label: 'Type', options: typeOptions },
    { type: 'select', name: 'faculty', label: 'Faculty', options: facultyOptions },
    { type: 'select', name: 'department', label: 'Department', options: departmentOptions },
    { type: 'textarea', name: 'annotation', label: 'Annotation' },
    { type: 'input', name: 'literature', label: 'Literature' },
    { type: 'input', name: 'fileUrl', label: 'File URL' },
  ],
}
