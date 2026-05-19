'use client'

import { ConfirmDialog } from './ConfirmDialog'
import { useConfirmStore } from './confirm.store'

export function GlobalConfirmDialog() {
  const { open, config, close } = useConfirmStore()

  if (!config) return null

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(v) => !v && close()}
      title={config.title}
      description={config.description}
      confirmLabel={config.confirmLabel}
      variant={config.variant}
      onConfirm={() => { config.onConfirm(); close() }}
    />
  )
}
