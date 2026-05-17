'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from 'zod'

import { FormDialog } from './FormDialog'
import { FormRender } from './FormRender'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'

interface FormConfig {
  title: string
  schema: ZodSchema
  defaultValues: Record<string, any>
  fields: any[]
}

interface FormFactoryProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  config: FormConfig
  values?: Record<string, any>
  onSubmit: (data: any) => void
  submitLabel: string
}

export function FormFactory({ open, onOpenChange, config, values, onSubmit, submitLabel }: FormFactoryProps) {
  const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(config.schema),
    defaultValues: config.defaultValues,
  })

  useEffect(() => {
    reset(values ?? config.defaultValues)
  }, [open])

  useEffect(() => {
    if (!values) return
    Object.entries(values).forEach(([key, val]) => setValue(key, val))
  }, [values])

  return (
    <FormDialog open={open} onOpenChange={onOpenChange} title={config.title}>
      <form onSubmit={handleSubmit(onSubmit)} className="contents">
        <FormRender
          fields={config.fields}
          register={register}
          control={control}
          Controller={Controller}
          errors={errors}
          watch={watch}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">{submitLabel}</Button>
        </DialogFooter>
      </form>
    </FormDialog>
  )
}