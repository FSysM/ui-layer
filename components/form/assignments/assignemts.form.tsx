'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  assignmentSchema,
  AssignmentFormData
} from '@/features/assignments/schemas/assignments.schema'

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
import { Textarea } from "@/components/ui/textarea"

import type { Assignments } from '@/features/assignments/types/assignments.types'

interface AssignmentsFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: AssignmentFormData) => void

  mode?: 'create' | 'edit'
  defaultValues?: Assignments | null
  submitLabel?: string
}

export function AssignmentsForm({
  open,
  onOpenChange,
  onSubmit,
  mode = 'create',
  defaultValues,
  submitLabel,
}: AssignmentsFormProps) {

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema),
  })

  const label = submitLabel ?? (mode === 'edit' ? 'Save' : 'Create')

  // ✅ KEY PART — fill form on edit
  useEffect(() => {
    if (open) {
      reset(
        defaultValues
          ? {
              topic: defaultValues.topic,
              type: defaultValues.type,
              faculty: defaultValues.faculty,
              department: defaultValues.department,
              annotation: defaultValues.annotation ?? '',
            }
          : {
              topic: '',
              type: '',
              faculty: '',
              department: '',
              annotation: '',
            }
      )
    }
  }, [open, defaultValues, reset])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-300">

        <form className="contents" onSubmit={handleSubmit(onSubmit)}>

          <DialogHeader>
            <DialogTitle>
              {mode === 'edit' ? 'Edit Assignment' : 'Create Assignment'}
            </DialogTitle>

            <DialogDescription>
              {mode === 'edit'
                ? 'Edit assignment and save changes.'
                : 'Create a new assignment. Click save when you’re done.'}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>

            <Field>
              <FieldLabel>Topic</FieldLabel>
              <Input {...register('topic')} />
              {errors.topic && <p className="text-red-500">{errors.topic.message}</p>}
            </Field>

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
                        <SelectItem value="bc">Bachelor</SelectItem>
                        <SelectItem value="mgr">Master</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && <p className="text-red-500">{errors.type.message}</p>}
            </Field>

            <Field>
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

            <Field>
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

            <Field>
              <FieldLabel>Annotation</FieldLabel>
              <Textarea {...register('annotation')} rows={4} />
              {errors.annotation && <p className="text-red-500">{errors.annotation.message}</p>}
            </Field>

          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit">
              {label}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}