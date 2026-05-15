'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submissionsSchema, SubmissionsFormData } from '@/features/submissions/schemas/submissions.schema'
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

import { Submissions } from '@/features/submissions/types/submissions.types'

interface SubmissionsFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: SubmissionsFormData) => void

  mode?: 'create' | 'edit'
  defaultValues?: Submissions | null
  submitLabel?: string
}

export function SubmissionsForm({ open, onOpenChange,mode = 'create', defaultValues, submitLabel, onSubmit }: SubmissionsFormProps) {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<SubmissionsFormData>({
        resolver: zodResolver(submissionsSchema),
    })
  
  const label = submitLabel ?? (mode === 'edit' ? 'Edit' : 'Submit')

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className='bg-green-600'>Submit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form className='contents' onSubmit={handleSubmit(onSubmit)}>
          { /* HEADER */}
          <DialogHeader>
            <DialogTitle>{mode === 'edit' ? 'Edit Submission' : 'Create Submission'}</DialogTitle>
            <DialogDescription>
              {mode === 'edit'
                ? 'Edit submission and save changes.'
                : 'Create a new submission. Click save when you&apos;re done.'}
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
            <Button type="submit">{label}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
