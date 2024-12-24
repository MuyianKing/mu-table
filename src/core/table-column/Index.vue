<script setup lang="ts">
import { inject, onMounted, useId, useSlots } from 'vue'
import { getCanUseValue } from '../../utils/common'

defineOptions({
  name: 'HlTableColumn',
})

const props = defineProps({
  prop: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '',
  },
  minWidth: {
    type: [Number, String],
    default: '',
  },
  align: {
    type: String,
    default: 'center',
  },
  className: {
    type: String,
    default: '',
  },
})

// 唯一id
const uuid = useId()

// 没有插槽的渲染函数
const DEFAULT_RENDER_CELL = function ({ row }) {
  return (row[props.prop] === undefined || row[props.prop] === null) ? '' : row[props.prop]
}

// 插槽
const slots = useSlots()
const store = inject('tableStore', null)

// 渲染函数
const renderCell = slots.default || DEFAULT_RENDER_CELL

// 渲染方法
function renderRow(data) {
  return renderCell(data)
}

function init() {
  const label = props.label || ''
  // 最小宽度
  let minWidth = props.minWidth
  if (minWidth) {
    minWidth = getCanUseValue(minWidth)
  } else {
    minWidth = `calc(${label.length}em + ${20}px)`
  }

  // 宽度
  const width = getCanUseValue(props.width)

  // 对其方式
  const textAlign = props.align || store.value.table.align || 'left'

  // 插入列
  store.value.insertColumn({
    uuid,
    label,
    className: props.className,
    // 渲染过程中会把width和min-width覆盖掉，需要缓存
    orgWidth: width,
    orgMinWidth: minWidth,
    style: {
      textAlign,
      minWidth,
      width,
    },
    render: renderRow,
    renderHeader: slots.header || null,
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <div :id="uuid" />
</template>
