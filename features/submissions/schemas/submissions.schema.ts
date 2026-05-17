import { z } from 'zod';

export const submissionsSchema = z.object({
	assignmentId: z.string().min(1, 'Assignment is required'),
	literature: z.string().min(1, 'Literature is required'),
	fileUrl: z.string().min(1, 'File URL is required'),
});

export const editSubmissionsSchema = z.object({
	literature: z.string().min(1, 'Literature is required'),
	fileUrl: z.string().min(1, 'File URL is required'),
});

export type SubmissionsFormData = z.infer<typeof submissionsSchema>;
export type EditSubmissionsFormData = z.infer<typeof editSubmissionsSchema>;
