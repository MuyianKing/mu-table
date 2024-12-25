<script setup lang="ts">
import type { Align } from '../types/index'
import { useDebounceFn } from '@vueuse/core'
import { nextTick, onMounted, provide, ref, useId, watch } from 'vue'
import useResize from './hooks/useResize'
import ScrollBar from './ScrollBar.vue'
import TableBody from './table-body.tsx'
import TableHeader from './table-header.tsx'
import TableStore from './table-store'

defineOptions({
  name: 'MuTable',
})

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  noBorder: false,
  nowrap: false,
  align: 'center',
  scrollbarAlwaysOn: false,
})

interface Props {
  data: unknown[]
  noBorder?: boolean
  nowrap?: boolean
  align?: Align
  scrollbarAlwaysOn?: boolean // 始终显示滚动条
}

const store = ref(new TableStore())
provide('tableStore', store)

const tableId = useId()
store.value.table.id = tableId

const refresh_layout = ref(false)
// 根据tbody设置thead
function doLayout() {
  console.log('doLayout')

  const table = document.getElementById(tableId)
  if (!table) {
    return
  }

  // 清除样式
  clearStyle()

  // 清除table的宽度
  const tbodyer: HTMLElement | null = table.querySelector('.body-wrapper')
  if (!tbodyer) {
    return
  }

  tbodyer.style.width = ''

  // 没有数据只需要把表头和表体的宽度设为一致即可
  if (props.data.length === 0) {
    const theader = table.querySelector('.mu-table-header')
    if (theader) {
      nextTick(() => {
        tbodyer.style.width = `${theader.clientWidth}px`
        sortColumns()
      })
    }
    return
  }

  // 清除样式等待表格重新渲染
  nextTick(() => {
    // 获取第一行tr
    const tbody = table.getElementsByClassName('mu-table-body')

    if (!tbody || tbody.length === 0) {
      return
    }

    const trs = tbody[0].getElementsByClassName('mu-table-tr')

    if (trs && trs.length > 0) {
      // 获取thead的th
      const body_tds = trs[0].getElementsByClassName('mu-table-td')

      // 设置宽度
      const columns = [...store.value.columns]
      for (let i = 0, len = body_tds.length; i < len; i++) {
        // 根据uuid获取对应的配置项
        const uuid = body_tds[i].getAttribute('data-uuid')
        const column = columns.find(item => item.uuid === uuid)
        const width = `${body_tds[i].getBoundingClientRect().width}px`

        if (!column) {
          continue
        }
        // tbody 不设置maxWidth，数据会撑开td
        column.style.minWidth = width
        column.style.width = width
        column.style.maxWidth = width
      }

      store.value.setColumns(columns)
      sortColumns()
      startObserve()
    }

    setTimeout(() => {
      scroll_bar.value && scroll_bar.value.setScroll()
    }, 0)
    refresh_layout.value = false
  })
}

// 对列按照mu-table-column的顺序排序
function sortColumns() {
  const table = document.getElementById(tableId)

  if (table) {
    const trs = table.querySelector('.hidden-columns')!.querySelectorAll('div')
    if (trs && trs.length > 0) {
      const column_map: {
        [x: string]: object
      } = {}
      store.value.columns.forEach((item) => {
        column_map[item.uuid] = item
      })

      const new_columns: any[] = []
      trs.forEach((tr) => {
        const id = tr.getAttribute('id') as string
        if (column_map[id])
          new_columns.push(column_map[id])
      })

      store.value.setColumns(new_columns)
    }
  }
}

// 清空doLayout方法中设置的样式，否则会影响计算
function clearStyle() {
  const table = document.getElementById(tableId)
  if (!table) {
    return
  }

  const tbody = table.getElementsByClassName('mu-table-body')
  if (!tbody || tbody.length === 0)
    return

  // 设置宽度
  const columns = [...store.value.columns]

  columns.forEach((col) => {
    // tbody
    col.style.width = col.orgWidth
    col.style.minWidth = col.orgMinWidth
    col.style.maxWidth = ''
  })
  store.value.setColumns(columns)
}

watch(() => props.data, (val) => {
  store.value.setData(val)
  // 取消不换行
  refresh_layout.value = true
  // 重新布局
  nextTick(() => {
    doLayout()
  })
}, {
  immediate: true,
  deep: true,
})

watch(() => store.value.columns.length, () => {
  nextTick(() => {
    resize()
  })
})

watch([() => props.nowrap], () => {
  store.value.table.align = props.align
  store.value.table.nowrap = props.nowrap
}, {
  immediate: true,
})

// 监听表格容器变化，重新布局
const resize = useDebounceFn(() => {
  // 取消不换行
  refresh_layout.value = true
  doLayout()
}, 100)

const { watchTableResize, startObserve } = useResize(tableId, resize)

const scroll_bar = ref()
const scroll_bar_active = ref(false)
function handleScroll() {
  scroll_bar.value && scroll_bar.value.scrollBar()
}

onMounted(() => {
  watchTableResize()
})
</script>

<template>
  <div :id="tableId" class="mu-table" :class="{ 'mu-table-border': !noBorder, 'mu-table-nowrap': nowrap && !refresh_layout }">
    <div class="hidden-columns">
      <slot />
    </div>

    <table-header />
    <div class="body-wrapper" @scroll="handleScroll" @mouseenter="scroll_bar_active = data.length > 0 && true" @mouseleave="scroll_bar_active = false">
      <table-body />

      <!-- 自定义滚动条 -->
      <scroll-bar ref="scroll_bar" :table-id="tableId" :active="scrollbarAlwaysOn || scroll_bar_active" />
    </div>
  </div>
</template>

<style lang='scss'>
@use '../../style/index.scss';
@use '../../style/theader.scss';
@use '../../style/tbody.scss';
</style>
