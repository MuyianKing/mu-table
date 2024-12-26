import type { ComponentResolver } from 'unplugin-vue-components'

function Resolver(): ComponentResolver[] {
  return [
    {
      type: 'component',
      resolve: (name: string) => {
        if (['MuTable', 'MuTableColumn'].includes(name)) {
          return {
            name,
            importName: name,
            from: '@muyianking/table',
            path: `@muyianking/table/index.js`,
            sideEffects: '@muyianking/table/index.css',
          }
        }
      },
    },
  ]
}

export const MuTableResolver = Resolver
export default Resolver
