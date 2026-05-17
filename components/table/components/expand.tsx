"use client"

import * as React from "react"

export type ExpandField = {
  label: string
  accessor: string
}

export type ExpandSection =
  | { type: 'fields'; fields: ExpandField[] }
  | { type: 'list'; title: string; emptyText: string; accessor: string; fields: ExpandField[] }

export type ExpandConfig = ExpandSection[]

function getValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

function Field({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm">{value != null ? String(value) : '—'}</span>
    </div>
  )
}

interface ExpandPanelProps {
  row: any
  config: ExpandConfig
}

export function ExpandPanel({ row, config }: ExpandPanelProps) {
  return (
    <div className="space-y-4">
      {config.map((section, i) => {
        if (section.type === 'fields') {
          return (
            <div key={i} className="grid gap-3 grid-cols-2 lg:grid-cols-3">
              {section.fields.map((field) => (
                <Field key={field.label} label={field.label} value={getValue(row, field.accessor)} />
              ))}
            </div>
          )
        }

        const items: any[] = getValue(row, section.accessor) ?? []
        return (
          <div key={i} className="border-t pt-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {section.title}
            </p>
            {items.length > 0 ? (
              items.map((item, j) => (
                <div key={j} className="grid gap-3 grid-cols-2 lg:grid-cols-3">
                  {section.fields.map((field) => (
                    <Field key={field.label} label={field.label} value={getValue(item, field.accessor)} />
                  ))}
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">{section.emptyText}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function buildExpandRenderer<T>(config: ExpandConfig): (row: T) => React.ReactNode {
  return (row: T) => <ExpandPanel row={row} config={config} />
}
