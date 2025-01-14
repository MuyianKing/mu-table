import antfu from '@antfu/eslint-config'
import eslint from '@muyianking/config/eslint.config.mjs'

export default antfu({
  formatters: true,
  ignores: ['**/public/**'],
}, {
  rules: eslint,
  files: ['**/src/**', '**/script/**'],
})
