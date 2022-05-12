import { ElTable, ElTableColumn } from 'element-plus'

export type TispTableOptions = Partial<typeof ElTable>
export type ColumnOptionsType = {
  selection?: boolean
  selectKey?: string
  index?: boolean
  indexFixed?: boolean | string
}
export type TispTableColumn = Partial<
  typeof ElTableColumn & {
    children?: TispTableColumn[]
    [key: string]: any
  }
>

export type TispTableType = {
  setCurrentRow: (row?: any) => void
  toggleRowSelection: (row: any, selected: boolean) => void
  clearSelection: () => void
  clearFilter: (columnKey: string[]) => void
}
