import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { FieldProps } from '../types/form.types'

export function ReadonlyField({ field, watch }: FieldProps) {
  const value = watch(field.name)
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <Input value={value ?? ''} disabled readOnly />
    </div>
  )
}
