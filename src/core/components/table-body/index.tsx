import type { ColumnRow } from '@/core/types/index'
import TableStore from '@/core/types/table-store'
import { computed, defineComponent, inject, ref, useId } from 'vue'
import useTips from './hooks/useTips'
import '@style/tbody.scss'

export default defineComponent({
  name: 'MuTableBody',
  props: {
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

    const tooltip_id = useId()
    const { setTips, hideTip } = useTips(tooltip_id)

    return () => (
      <table class="mu-table-body" cellspacing="0" cellpadding="0">
        <tbody>
          {
            data.value.map((row, row_index) => {
              const arr = [
                <tr
                  key={row[store.value.table.rowKey] || useId()}
                  class={getClassName({ index: row_index, row })}
                  onClick={() => {
                    rowClick({ row, index: row_index })
                  }}
                >
                  {columns.value.map(column => (
                    <td
                      key={column.uuid}
                      data-uuid={column.uuid}
                      class={`mu-table-cell mu-table-td ${column.className || ''}`}
                      style={{ ...column.style, textAlign: column.style.textAlign || store.value.table.align }}
                      onMouseenter={store.value.table.nowrap ? setTips : undefined}
                      onMouseleave={store.value.table.nowrap ? hideTip : undefined}
                    >
                      {column.render({
                        row,
                        index: row_index,
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

        <div class="mu-table-tooltip" id={tooltip_id}>
          <div class="mu-table-tooltip-arrow"></div>
          <div class="mu-table-tooltip-content"></div>
        </div>
      </table>
    )
  },
})
