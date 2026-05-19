import { z } from 'zod';

const typeEnum = z.enum(['bc', 'mgr', 'phd', 'other']);
const facultyEnum = z.enum(['PRF', 'CHEM']);
const departmentEnum = z.enum(['Informatics', 'Mathematics', 'Physics', 'Chemistry']);

export const submissionsSchema = z.object({
  assignmentId: z.string().min(1, 'Assignment is required'),
  topic: z.string().min(1, 'Topic is required'),
  type: typeEnum,
  faculty: facultyEnum,
  department: departmentEnum,
  annotation: z.string().optional(),
  literature: z.string().min(1, 'Literature is required'),
});

export const editSubmissionsSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  type: typeEnum,
  faculty: facultyEnum,
  department: departmentEnum,
  annotation: z.string().optional(),
  literature: z.string().min(1, 'Literature is required'),
});

export type SubmissionsFormData = z.infer<typeof submissionsSchema>;
export type EditSubmissionsFormData = z.infer<typeof editSubmissionsSchema>;
