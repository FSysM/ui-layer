import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { assignmentSchema, AssignmentFormData } from '@/features/assignments/schemas/assignments.schema'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AssignmentsFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: AssignmentFormData) => void
}

export function AssignmentsForm({ open, onOpenChange, onSubmit }: AssignmentsFormProps) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<AssignmentFormData>({
        resolver: zodResolver(assignmentSchema),
    })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-300">
        <form className='contents' onSubmit={handleSubmit(onSubmit)}>
          { /* HEADER */}
          <DialogHeader>
            <DialogTitle>Create Assignment</DialogTitle>
            <DialogDescription>
              Create a new assignment. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
              { /* topic */}
            <Field>
              <Label htmlFor="topic">Topic</Label>
              <Input id="topic" {...register('topic')} />
              {errors.topic && <p className="text-red-500">{errors.topic.message}</p>}
            </Field>
            { /* type */}
            <Field className="w-full max-w-xs">
              <FieldLabel>Type</FieldLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ''}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="bachelor">Bachelor</SelectItem>
                        <SelectItem value="master">Master</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && <p className="text-red-500">{errors.type.message}</p>}
            </Field>
            <div className="flex" />
            { /* faculty */}
            <Field className="flex-1">
              <FieldLabel>Faculty</FieldLabel>
              <Controller
                name="faculty"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ''}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="PRF">PRF</SelectItem>
                        <SelectItem value="CHEM">CHEM</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.faculty && <p className="text-red-500">{errors.faculty.message}</p>}
            </Field>
            { /* department */}
            <Field className="flex-2">
              <FieldLabel>Department</FieldLabel>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value ?? ''}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Informatics">Informatics</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.department && <p className="text-red-500">{errors.department.message}</p>}
            </Field>
            <div />
            <Field>
              <FieldLabel htmlFor="annotation">Annotation</FieldLabel>
              <Textarea
                id="annotation"
                {...register('annotation')}
                placeholder="Annotation..."
                rows={4}
              />
              {errors.annotation && <p className="text-red-500">{errors.annotation.message}</p>}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
