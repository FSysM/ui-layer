import { create } from 'zustand';
import { Assignments } from '../types/assignments.types';

type State = {
  open: boolean;
  editing: Assignments | null;
};

type Actions = {
  openCreate: () => void;
  openEdit: (a: Assignments) => void;
  reset: () => void;
};

export const useAssignmentsStore = create<State & Actions>((set) => ({
  open: false,
  editing: null,

  openCreate: () => set({ open: true, editing: null }),
  openEdit: (a) => set({ open: true, editing: a }),
  reset: () => set({ open: false, editing: null }),
}));
