'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useApproveStore } from '../store/approve.store'
import { useApproveSubmission } from '../hooks/useSubmissions'
import { useTeachers } from '@/features/users/hooks/useTeachers'
import { useMe } from '@/features/auth/hooks/useMe'

export function ApproveDialog() {
  const { open, submission, close } = useApproveStore()
  const { mutate: approve, isPending } = useApproveSubmission()
  const { data: teachers } = useTeachers()
  const { data: user } = useMe()

  const [opponentId, setOpponentId] = useState('')

  // Exclude the supervisor (current user) from opponent options
  const opponents = teachers?.filter((t) => t.id !== user?.id) ?? []

  function handleApprove() {
    if (!submission || !opponentId) return
    approve({ id: submission.id, opponentId }, { onSuccess: close })
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Submission</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-sm text-muted-foreground">
            Approving <span className="font-medium text-foreground">{submission?.topic}</span>.
            Select the opponent reviewer.
          </p>

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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={close}>Cancel</Button>
          <Button onClick={handleApprove} disabled={!opponentId || isPending}>
            {isPending ? 'Approving...' : 'Approve'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
