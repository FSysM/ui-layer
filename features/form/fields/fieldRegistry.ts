import type { ComponentType } from 'react'
import type { FieldProps } from '../types/form.types'
import { InputField } from './InputField'
import { SelectField } from './SelectField'
import { TextareaField } from './TextareaField'
import { ReadonlyField } from './ReadonlyField'

export const fieldRegistry: Record<string, ComponentType<FieldProps>> = {
  input: InputField,
  select: SelectField,
  textarea: TextareaField,
  readonly: ReadonlyField,
}
