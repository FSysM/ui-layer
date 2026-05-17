export type SubmissionReview = {
  id: string;
  grade: string;
  comment: string | null;
  type: string;
};

export type Review = {
  id: string;
  grade: string;
  comment?: string;
  type: string;
  submissionId: string;
  submission: {
    assignment: {
      topic: string;
      student: { id: string; name: string | null };
      supervisor: { id: string; name: string };
    };
  };
  reviewer: { name: string };
};
