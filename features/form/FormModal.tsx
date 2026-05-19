'use client'

import { useEffect, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormDialog } from './FormDialog'
import { FormRender } from './FormRender'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import type { FormConfig } from './types/form.types'

interface FormModalProps {
  open: boolean
  onOpenChange: (v: boolean) => void
  config: FormConfig
  values?: Record<string, any>
  onSubmit: (data: Record<string, any>) => void
  submitLabel: string
  children?: ReactNode
}

export function FormModal({ open, onOpenChange, config, values, onSubmit, submitLabel, children }: FormModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(config.schema),
    defaultValues: config.defaultValues,
  })

  useEffect(() => {
    reset(values ?? config.defaultValues)
  }, [open, values])

  return (
    <FormDialog open={open} onOpenChange={onOpenChange} title={config.title}>
      <form onSubmit={handleSubmit(onSubmit)} className="contents">
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-1">
          <FormRender
            fields={config.fields}
            register={register}
            control={control}
            errors={errors}
            watch={watch}
          />
          {children}
        </div>
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
