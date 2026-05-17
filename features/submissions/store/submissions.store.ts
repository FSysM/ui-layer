import { create } from 'zustand';
import { Submissions } from '../types/submissions.types';

type State = {
  open: boolean;
  editing: Submissions | null;
};

type Actions = {
  openCreate: () => void;
  openEdit: (a: Submissions) => void;
  reset: () => void;
};

export const useSubmissionsStore = create<State & Actions>((set) => ({
  open: false,
  editing: null,

  openCreate: () => set({ open: true, editing: null }),
  openEdit: (a) => set({ open: true, editing: a }),
  reset: () => set({ open: false, editing: null }),
}));
