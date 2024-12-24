import type { ColumnRow } from '../types/index'
import { computed, defineComponent, inject, ref, useId } from 'vue'
import TableStore from './table-store'

export default defineComponent({
  name: 'MuTableBody',
  props: {
    // 主键
    rowKey: {
      type: String,
      default: 'id',
    },
    rowClass: {
      type: Function,
      default: null,
    },
  },
  setup(props, { emit }) {
    const store = inject('tableStore', ref(new TableStore()))
    const columns = computed(() => store.value.columns)
    const data = computed(() => store.value.data)

    function getClassName({ index, row }: ColumnRow) {
      const arr = props.rowClass ? ['mu-table-tr', props.rowClass({ index, row })] : ['mu-table-tr']
      if (index % 2 !== 0) {
        arr.push('mu-table-td-enev')
      }

      return arr.filter(item => item).join(' ')
    }

    function rowClick(item: ColumnRow) {
      emit('row-click', item)
    }
    return () => (
      <table class="mu-table-body" cellspacing="0" cellpadding="0">
        <tbody>
          {
            data.value.map((row, index) => {
              const arr = [
                <tr
                  key={row[props.rowKey] || useId()}
                  class={getClassName({ index, row })}
                  onClick={() => {
                    rowClick({ row, index })
                  }}
                >
                  {columns.value.map(column => (
                    <td key={column.uuid} data-uuid={column.uuid} class={`mu-table-cell mu-table-td ${column.className}`} style={column.style}>
                      {column.render({
                        row,
                        index,
                      })}
                    </td>
                  ))}
                </tr>,
              ]
              return arr
            })
          }

          {data.value.length === 0 && (
            <tr>
              <td class="mu-table-td mu-table-no-data" colspan={columns.value.length}>
                暂无数据
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  },
})
