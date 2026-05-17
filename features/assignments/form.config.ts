import { assignmentSchema } from './schemas/assignments.schema'
import type { FormConfig } from '@/features/form/types/form.types'

export const assignmentFormConfig: FormConfig = {
  title: 'Assignment',
  schema: assignmentSchema,
  defaultValues: {
    topic: '',
    type: '',
    faculty: '',
    department: '',
    annotation: '',
  },
  fields: [
    { type: 'input', name: 'topic', label: 'Topic' },
    {
      type: 'select',
      name: 'type',
      label: 'Type',
      options: [
        { label: 'Bachelor', value: 'bc' },
        { label: 'Master', value: 'mgr' },
        { label: 'PhD', value: 'phd' },
      ],
    },
    {
      type: 'select',
      name: 'faculty',
      label: 'Faculty',
      options: [
        { label: 'PRF', value: 'PRF' },
        { label: 'CHEM', value: 'CHEM' },
      ],
    },
    {
      type: 'select',
      name: 'department',
      label: 'Department',
      options: [
        { label: 'Informatics', value: 'Informatics' },
        { label: 'Mathematics', value: 'Mathematics' },
        { label: 'Physics', value: 'Physics' },
        { label: 'Chemistry', value: 'Chemistry' },
      ],
    },
    { type: 'textarea', name: 'annotation', label: 'Annotation' },
  ],
}
