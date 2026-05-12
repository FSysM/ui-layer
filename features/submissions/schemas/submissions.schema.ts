import { z } from 'zod';

export const submissionsSchema = z.object({
	topic: z.string().min(1, 'Topic is required'),
	type: z.enum(['bachelor', 'master', 'phd']),
	faculty: z.string().min(1, 'Faculty is required'),
	department: z.string().min(1, 'Department is required'),
	annotation: z.string().optional(),
});

export type SubmissionsFormData = z.infer<typeof submissionsSchema>;
