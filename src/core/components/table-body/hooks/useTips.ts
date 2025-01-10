import { isOverflow } from '@/core/utils/dom'
import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { useDebounceFn } from '@vueuse/core'

export default function (tooltip_id: string) {
  const setTips = useDebounceFn((e: MouseEvent) => {
    if (!e.target) {
      return
    }

    const target = e.target as HTMLElement
    if (!isOverflow(target)) {
      return
    }

    const tooltip_el = document.getElementById(tooltip_id) as HTMLElement

    const content = target.textContent || ''
    tooltip_el.querySelector('.mu-table-tooltip-content')!.innerHTML = content

    setPosition(target, tooltip_el)

    setTimeout(() => {
      tooltip_el.style.display = 'block'
      setPosition(target, tooltip_el)
    }, 0)
  }, 100)

  function setPosition(target: HTMLElement, tooltip_el: HTMLElement) {
    const arrow_el = tooltip_el.querySelector('.mu-table-tooltip-arrow') as HTMLElement
    computePosition(target, tooltip_el, {
      placement: 'top',
      middleware: [
        flip(),
        shift(),
        offset(6),
        arrow({
          element: arrow_el,
        }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      const scroll_top = document.getElementsByTagName('html')[0].scrollTop

      tooltip_el.style.left = `${x}px`
      tooltip_el.style.top = `${y - scroll_top}px`
      target.style.cursor = 'pointer'

      const arrow = middlewareData.arrow

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]]

      Object.assign(arrow_el.style, {
        left: arrow?.x != null ? `${arrow.x}px` : '',
        top: arrow?.y != null ? `${arrow.y}px` : '',
        right: '',
        bottom: '',
        [staticSide as string]: '-4px',
      })
    })
  }

  function hideTip(e: MouseEvent) {
    const el = document.getElementById(tooltip_id) as HTMLElement
    const target = e.target as HTMLElement
    target.style.cursor = ''
    el.querySelector('.mu-table-tooltip-content')!.innerHTML = ''
    el.style.display = 'none'
  }

  return {
    setTips,
    hideTip,
  }
}
