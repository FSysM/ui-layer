import { z } from 'zod';

export const reviewSchema = z.object({
  grade: z.enum(['A', 'B', 'C', 'D', 'E', 'F']),
  comment: z.string().optional(),
});

export const createReviewSchema = reviewSchema.extend({
  submissionId: z.string().min(1),
  topic: z.string().optional(),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
export type CreateReviewFormData = z.infer<typeof createReviewSchema>;
