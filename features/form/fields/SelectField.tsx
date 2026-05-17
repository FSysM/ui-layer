import { Controller } from 'react-hook-form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import type { FieldConfig, FieldProps } from '../types/form.types'

type SelectConfig = Extract<FieldConfig, { type: 'select' }>

export function SelectField({ field, control, errors }: FieldProps) {
  const { options, onSelect } = field as SelectConfig

  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>

      <Controller
        name={field.name}
        control={control}
        render={({ field: rhf }) => (
          <Select
            onValueChange={(val) => {
              rhf.onChange(val)
              onSelect?.(val)
            }}
            value={rhf.value ?? ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {errors[field.name] && (
        <p className="text-sm text-red-500">{errors[field.name]?.message as string}</p>
      )}
    </div>
  )
}
