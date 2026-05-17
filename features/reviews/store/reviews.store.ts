import { create } from 'zustand';
import { SubmissionReview } from '../types/reviews.types';

type ReviewType = 'SUPERVISOR' | 'OPPONENT';

type State = {
  open: boolean;
  editing: SubmissionReview | null;
  submissionId: string | null;
  topic: string | null;
  reviewType: ReviewType | null;
};

type Actions = {
  openCreate: (submissionId: string, topic: string, reviewType: ReviewType) => void;
  openEdit: (review: SubmissionReview) => void;
  reset: () => void;
};

export const useReviewsStore = create<State & Actions>((set) => ({
  open: false,
  editing: null,
  submissionId: null,
  topic: null,
  reviewType: null,

  openCreate: (submissionId, topic, reviewType) =>
    set({ open: true, editing: null, submissionId, topic, reviewType }),
  openEdit: (review) => set({ open: true, editing: review }),
  reset: () =>
    set({ open: false, editing: null, submissionId: null, topic: null, reviewType: null }),
}));
