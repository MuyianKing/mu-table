import type { Align } from './index'

export default interface TableProps {
  data: unknown[]
  noBorder?: boolean
  nowrap?: boolean
  align?: Align
  scrollbarAlwaysOn?: boolean // 始终显示滚动条
  rowKey?: string
  maxHeight?: string | number // 表格最大高度
  stripe?: boolean
  rowClass?: (row: { index: number, row: any }) => string
}
