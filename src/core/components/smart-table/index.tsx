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
  setup(props, { slots }) {
    const config = props.config

    return () => (
      <MuTable data={props.data}>
        {
          config.map((item) => {
            return (
              <MuTableColumn prop={item.prop} label={item.label}>
                {{
                  default: slots[item.prop],
                  header: slots[`${item.prop}-header`],
                }}
              </MuTableColumn>
            )
          })
        }
      </MuTable>
    )
  },
})
