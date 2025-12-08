import { defineComponent } from 'vue'
import { MuTable } from '../table'
import { MuTableColumn } from '../table-column'

export default defineComponent({
  name: 'MuSmartTable',
  props: {
    config: {
      type: Array<any>,
      default() {
        return []
      },
    },
    data: {
      type: Array<any>,
      default() {
        return []
      },
    },
  },
  components: {
    MuTable,
    MuTableColumn,
  },
  setup(props, { slots }) {
    const config = props.config

    return () => (
      <mu-table data={props.data}>
        {
          config.map((item) => {
            return (
              <mu-table-column prop={item.prop} label={item.label}>
                {{
                  default: slots[item.prop],
                  header: slots[`${item.prop}-header`],
                }}
              </mu-table-column>
            )
          })
        }
      </mu-table>
    )
  },
})
