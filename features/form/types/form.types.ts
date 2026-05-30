import type { ZodType } from 'zod'
import type {
  UseFormRegister,
  Control,
  FieldValues,
  UseFormWatch,
  FieldErrors,
} from 'react-hook-form'

export type SelectOption = {
  label: string
  value: string
}

export type FieldConfig =
  | { type: 'input'; name: string; label: string }
  | { type: 'textarea'; name: string; label: string }
  | { type: 'readonly'; name: string; label: string }
  | {
      type: 'select'
      name: string
      label: string
      options: SelectOption[]
      onSelect?: (value: string) => void
    }

export type FormConfig = {
  title: string
  schema: ZodType<any, any>
  defaultValues: Record<string, any>
  fields: FieldConfig[]
}

export type FieldProps = {
  field: FieldConfig
  register: UseFormRegister<FieldValues>
  control: Control<FieldValues>
  errors: FieldErrors<FieldValues>
  watch: UseFormWatch<FieldValues>
}
