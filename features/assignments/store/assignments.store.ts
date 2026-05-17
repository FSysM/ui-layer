import { create } from 'zustand';
import { Assignments } from '../types/assignments.types';

type State = {
	open: boolean;
	editing: Assignments | null;
};

type Actions = {
	setOpen: (v: boolean) => void;
	setEditing: (a: Assignments | null) => void;

	openCreate: () => void;
	openEdit: (a: Assignments) => void;
	reset: () => void;
};

export const useAssignmentsStore = create<State & Actions>((set) => ({
	open: false,
	editing: null,

	setOpen: (v) => set({ open: v }),
	setEditing: (a) => set({ editing: a }),

	openCreate: () => set({ open: true, editing: null }),

	openEdit: (a) =>
		set({
			open: true,
			editing: a,
		}),

	reset: () =>
		set({
			open: false,
			editing: null,
		}),
}));
