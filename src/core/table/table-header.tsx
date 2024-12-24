import { computed, defineComponent, inject, ref } from 'vue'
import TableStore from './table-store'

export default defineComponent({
  props: {},
  setup() {
    const store = inject('tableStore', ref(new TableStore()))
    const columns = computed(() => store.value.columns)

    const align_map = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    }

    return () => (
      <table class="mu-table-header" cellspacing="0" cellpadding="0">
        <thead>
          <tr class="mu-table-tr">
            {columns.value.map(column => (
              <th
                class={`mu-table-cell mu-table-th ${column.className}`}
                style={column.style}
                key={column.uuid}
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
})
