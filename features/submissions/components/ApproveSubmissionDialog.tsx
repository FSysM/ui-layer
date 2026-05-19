'use client'

import { useState } from 'react'
import { ConfirmDialog } from '@/components/confirm-dialog/ConfirmDialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useApproveStore } from '../store/approve.store'
import { useApproveSubmission } from '../hooks/useSubmissions'
import { useTeachers } from '@/features/users/hooks/useTeachers'
import { useMe } from '@/features/auth/hooks/useMe'
import { useConfirmStore } from '@/components/confirm-dialog/confirm.store'

export function ApproveSubmissionDialog() {
  const { open, submission, close } = useApproveStore()
  const { mutate: approve } = useApproveSubmission()
  const { data: teachers } = useTeachers()
  const { data: user } = useMe()
  const { ask } = useConfirmStore()
  const [opponentId, setOpponentId] = useState('')

  const opponents = teachers?.filter((t) => t.id !== user?.id) ?? []

  function handleConfirm() {
    if (!submission || !opponentId) return
    const captured = { id: submission.id, topic: submission.topic, opponentId }
    close()
    setOpponentId('')
    ask({
      title: 'Approve Submission',
      description: `Approve "${captured.topic}" with the selected opponent?`,
      confirmLabel: 'Approve',
      onConfirm: () => approve({ id: captured.id, opponentId: captured.opponentId }),
    })
  }

  function handleOpenChange(v: boolean) {
    if (!v) { close(); setOpponentId('') }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Approve Submission"
      description={submission ? `Approving "${submission.topic}". Select the opponent reviewer.` : undefined}
      confirmLabel="Next"
      disabled={!opponentId}
      onConfirm={handleConfirm}
    >
      <Select value={opponentId} onValueChange={setOpponentId}>
        <SelectTrigger>
          <SelectValue placeholder="Select opponent..." />
        </SelectTrigger>
        <SelectContent>
          {opponents.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.name ?? t.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ConfirmDialog>
  )
}
