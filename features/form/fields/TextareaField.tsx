import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { FieldProps } from '../types/form.types'

export function TextareaField({ field, register, errors }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <Textarea {...register(field.name)} />
      {errors[field.name] && (
        <p className="text-sm text-red-500">{errors[field.name]?.message as string}</p>
      )}
    </div>
  )
}
