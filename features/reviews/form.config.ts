import { createReviewSchema, reviewSchema } from './schemas/reviews.schema'
import type { FormConfig } from '@/features/form/types/form.types'

const gradeOptions = ['A', 'B', 'C', 'D', 'E', 'F'].map((g) => ({ label: g, value: g }))

export function createReviewFormConfig(submissionId: string, topic: string): FormConfig {
  return {
    title: 'Create Review',
    schema: createReviewSchema,
    defaultValues: {
      submissionId,
      topic,
      grade: '',
      comment: '',
    },
    fields: [
      { type: 'readonly', name: 'topic', label: 'Topic' },
      { type: 'select', name: 'grade', label: 'Grade', options: gradeOptions },
      { type: 'textarea', name: 'comment', label: 'Comment' },
    ],
  }
}

export const editReviewFormConfig: FormConfig = {
  title: 'Edit Review',
  schema: reviewSchema,
  defaultValues: {
    grade: '',
    comment: '',
  },
  fields: [
    { type: 'select', name: 'grade', label: 'Grade', options: gradeOptions },
    { type: 'textarea', name: 'comment', label: 'Comment' },
  ],
}
