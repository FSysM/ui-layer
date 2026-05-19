import { create } from 'zustand'

type ConfirmConfig = {
  title: string
  description?: string
  confirmLabel?: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void
}

type State = {
  open: boolean
  config: ConfirmConfig | null
}

type Actions = {
  ask: (config: ConfirmConfig) => void
  close: () => void
}

export const useConfirmStore = create<State & Actions>((set) => ({
  open: false,
  config: null,
  ask: (config) => set({ open: true, config }),
  close: () => set({ open: false, config: null }),
}))
