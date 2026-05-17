import { fieldRegistry } from './fields/fieldRegistry'
import type { FieldConfig, FieldProps } from './types/form.types'

type FormRenderProps = Omit<FieldProps, 'field'> & {
  fields: FieldConfig[]
}

export function FormRender({ fields, register, control, errors, watch }: FormRenderProps) {
  return fields.map((field) => {
    const Component = fieldRegistry[field.type]
    if (!Component) return null

    return (
      <Component
        key={field.name}
        field={field}
        register={register}
        control={control}
        errors={errors}
        watch={watch}
      />
    )
  })
}
