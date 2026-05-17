import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"

export function SelectField({
  field,
  control,
  Controller,
  errors,
}: any) {
  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>

      <Controller
        name={field.name}
        control={control}
        render={({ field: rhf }: any) => (
          <Select
            onValueChange={(val) => {
              rhf.onChange(val)
              field.onSelect?.(val)
            }}
            value={rhf.value ?? ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>

            <SelectContent>
              {field.options.map((o: any) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {errors[field.name] && (
        <p className="text-sm text-red-500">
          {errors[field.name]?.message}
        </p>
      )}
    </div>
  )
}
