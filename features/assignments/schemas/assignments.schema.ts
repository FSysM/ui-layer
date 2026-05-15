import { z } from 'zod';

export const assignmentSchema = z.object({
	topic: z.string().min(1, 'Topic is required'),
	type: z.enum(['bc', 'mgr', 'phd']),
	faculty: z.string().min(1, 'Faculty is required'),
	department: z.string().min(1, 'Department is required'),
	annotation: z.string().optional(),
});

export type AssignmentFormData = z.infer<typeof assignmentSchema>;
