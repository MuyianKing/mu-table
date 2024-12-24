export default class TableStore {
  columns: any[]
  data: any[]
  table: object

  constructor() {
    // table的配置
    this.table = {}

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
  insertColumn(column: any) {
    const index = this.columns.findIndex(item => (item.uuid === column.uuid))
    if (index > -1) {
      this.updateColumn(index, column)
    } else {
      this.columns.push(column)
    }
  }

  // 更新列
  updateColumn(index: number, column: any) {
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
