import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function TextareaField({ field, register, errors }: any) {
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>

      <Textarea {...register(field.name)} />

      {errors[field.name] && (
        <p className="text-sm text-red-500">
          {errors[field.name]?.message}
        </p>
      )}
    </div>
  )
}
