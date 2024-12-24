import type { Ref } from 'vue'
import { computed, inject } from 'vue'

export default {
  props: {
  },
  setup(props, ctx) {
    const store: Ref = inject('tableStore', { columns: [] })
    const columns = computed(() => store.value.columns)

    const align_map = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    }

    function spanClick(column, index) {
      ctx.emit('spanClick', column, index)
    }
    return () => (
      <table class="mu-table-header" cellspacing="0" cellpadding="0" border="0">
        <thead>
          <tr class="mu-table-tr">
            {columns.value.map((column, index) => (
              <th
                class={`mu-table-cell mu-table-th ${column.className}`}
                style={column.style}
                key={column.uuid}
                onClick={() => {
                  spanClick(column, index)
                }}
              >
                <div class="mu-table-th-div" style={{ justifyContent: align_map[column.style.textAlign] }}>
                  {column.renderHeader
                    ? column.renderHeader()
                    : (
                        <span style={{ verticalAlign: 'middle', textAlign: column.style.textAlign }}>
                          {column.label}
                        </span>
                      )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
      </table>
    )
  },
}
