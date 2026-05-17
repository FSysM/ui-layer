import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { FieldProps } from '../types/form.types'

export function InputField({ field, register, errors }: FieldProps) {
  return (
    <div className="space-y-3">
      <Label>{field.label}</Label>
      <Input {...register(field.name)} />
      {errors[field.name] && (
        <p className="text-sm text-red-500">{errors[field.name]?.message as string}</p>
      )}
    </div>
  )
}
