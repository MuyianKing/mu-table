import { useEventListener } from '@vueuse/core'

export default function (tableId: string, resize: () => void) {
  let mutationObserver: MutationObserver | null = null
  let intersectionObserver: IntersectionObserver | null = null
  let last_intersection_observer_status = 0

  function disconnectObserver() {
    mutationObserver && mutationObserver.disconnect()
    intersectionObserver && intersectionObserver.disconnect()
  }

  function watchTableResize() {
    useEventListener(window, 'resize', resize)

    // 监听容器属性等变化
    mutationObserver = new MutationObserver(resize)

    // 监听页面的显示和隐藏
    intersectionObserver = new IntersectionObserver((entries) => {
      // 第一次进入视野resize
      if (entries[0].intersectionRatio > 0 && last_intersection_observer_status <= 0) {
        resize()
      }

      last_intersection_observer_status = entries[0].intersectionRatio
    })
  }

  // 开始监听容器变化
  function startObserve() {
    disconnectObserver()

    let table = document.getElementById(tableId)
    if (table instanceof Element) {
      table = table.querySelector('.mu-table-body')

      if (!table) {
        return
      }
      mutationObserver && mutationObserver.observe(table, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true,
      })

      intersectionObserver && intersectionObserver.observe(table)
    }
  }

  return {
    watchTableResize,
    startObserve,
  }
}
