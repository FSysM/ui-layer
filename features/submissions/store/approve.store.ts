import { create } from 'zustand';
import type { Submissions } from '../types/submissions.types';

type State = {
  open: boolean;
  submission: Submissions | null;
};

type Actions = {
  openApprove: (submission: Submissions) => void;
  close: () => void;
};

export const useApproveStore = create<State & Actions>((set) => ({
  open: false,
  submission: null,
  openApprove: (submission) => set({ open: true, submission }),
  close: () => set({ open: false, submission: null }),
}));
