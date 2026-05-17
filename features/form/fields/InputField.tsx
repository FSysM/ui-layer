import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputField({ field, register, errors }: any) {
  return (
    <div className="space-y-3">
      <Label>{field.label}</Label>

      <Input {...register(field.name)} />

      {errors[field.name] && (
        <p className="text-sm text-red-500">
          {errors[field.name]?.message}
        </p>
      )}
    </div>
  )
}
