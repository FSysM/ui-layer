import type { SubmissionReview } from '@/features/reviews/types/reviews.types';

export type Submissions = {
  id: string;

  // Student-editable copy of assignment data
  topic: string;
  type: string;
  faculty: string;
  department: string;
  annotation: string | null;

  // Submission-specific fields
  status: string;
  literature: string | null;
  fileUrl: string | null;
  submissionDate: string;

  // Relations (reference only)
  assignment: {
    id: string;
    assignmentDate: string;
    student: { id: string; name: string | null } | null;
    supervisor: { id: string; name: string };
  } | null;

  opponent: { id: string; name: string | null } | null;

  reviews: SubmissionReview[];
};

export type SubmissionFormModel = {
  assignmentId: string;
  topic: string;
  type: string;
  faculty: string;
  department: string;
  annotation: string;
  literature: string;
  fileUrl: string;
};
