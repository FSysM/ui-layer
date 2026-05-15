export type ExpandField<T> = {
  label: string
  accessor: keyof T
}

type ExpandProps<T> = {
  row: T
  config: ExpandField<T>[]
}

export function Expand<T>({ row, config }: ExpandProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      {config.map((item) => (
        <div key={item.label} className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {item.label}
          </span>
          <span>{String(row[item.accessor] ?? "—")}</span>
        </div>
      ))}
    </div>
  )
}
