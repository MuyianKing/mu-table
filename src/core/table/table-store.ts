import type { Column } from '../types/'

export default class TableStore {
  columns: Column[]
  data: any[]
  table: {
    align: 'left' | 'right' | 'center'
  }

  constructor() {
    // table的配置
    this.table = {
      align: 'center',
    }

    // 列配置
    this.columns = []

    // 数据
    this.data = []
  }

  // 设置数据
  setData(data: any[]) {
    this.data = data
  }

  // 设置columns
  setColumns(columns: any[]) {
    this.columns = columns
  }

  // 插入列
  insertColumn(column: Column) {
    const index = this.columns.findIndex(item => (item.uuid === column.uuid))
    if (index > -1) {
      this.updateColumn(index, column)
    } else {
      this.columns.push(column)
    }
  }

  // 更新列
  updateColumn(index: number, column: Column) {
    this.columns[index] = (column)
  }

  // 删除列
  deleteColumn(uuid: string) {
    const index = this.columns.findIndex(item => (item.uuid === uuid))
    if (index > -1) {
      this.columns.splice(index, 1)
    }
  }
}
