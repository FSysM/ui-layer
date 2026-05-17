import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function ReadonlyField({ field, watch }: any) {
  const value = watch(field.name)

  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <Input value={value ?? ''} disabled readOnly />
    </div>
  )
}