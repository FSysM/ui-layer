export type ExpandField = {
  label: string
  accessor: string
}

type ExpandProps<T> = {
  row: T
  config: ExpandField[]
}

function getValue(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export function Expand<T>({ row, config }: { row: T; config: ExpandField[] }) {
  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
      {config.map((item) => (
        <div key={item.label} className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {item.label}
          </span>
          <span>{String(getValue(row, item.accessor) ?? "—")}</span>
        </div>
      ))}
    </div>
  )
}

