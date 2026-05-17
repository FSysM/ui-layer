import { fieldRegistry } from "./fields"

export function FormRender({
  fields,
  register,
  control,
  Controller,
  errors,
  watch,
}: any) {
  return fields.map((field: any) => {
    const Component = fieldRegistry[field.type]

    if (!Component) return null

    return (
      <Component
        key={field.name}
        field={field}
        register={register}
        control={control}
        Controller={Controller}
        errors={errors}
        watch={watch}
      />
    )
  })
}
