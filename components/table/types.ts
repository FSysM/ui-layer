export type ActionConfig<T> = {
  label: string
  onClick: (row: T) => void
  visible?: (row: T) => boolean
}
