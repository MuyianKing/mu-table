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
    tooltip_el.style.display = 'block'

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
      tooltip_el.style.left = `${x}px`
      tooltip_el.style.top = `${y}px`
      target.style.cursor = 'pointer'

      const { x: arrowX, y: arrowY } = middlewareData.arrow

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placement.split('-')[0]]

      Object.assign(arrow_el.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide as string]: '-4px',
      })
    })
  }, 100)

  function hideTip(e: MouseEvent) {
    const el = document.getElementById(tooltip_id) as HTMLElement
    const target = e.target as HTMLElement
    target.style.cursor = ''
    // el.style.display = 'none'
  }

  return {
    setTips,
    hideTip,
  }
}
