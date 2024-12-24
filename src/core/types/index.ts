export interface Column {
  uuid: string
  label: string
  className?: string
  orgWidth: string
  orgMinWidth: string
  style: {
    textAlign: Align
    minWidth: string
    maxWidth: string
    width: string
  }
  render: (data: any) => string
  renderHeader?: () => string
}

export interface ColumnRow {
  index: number
  row: any
}

export interface ColumnSlot {
  default?: () => string
  header?: () => string
}

export type Align = 'center' | 'left' | 'right'
