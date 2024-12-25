import { computePosition } from '@floating-ui/dom'
import { isOverflow } from '../../../utils/dom'

export default function (tooltip_id: string) {
  function setTips(e: MouseEvent, is_half: boolean) {
    if (!e.target) {
      return
    }

    const target = e.target as HTMLElement
    if (!isOverflow(target)) {
      return
    }

    const tooltip_el = document.getElementById(tooltip_id) as HTMLElement

    computePosition(target, tooltip_el, {
      placement: 'right',
    }).then(({ x, y }) => {
      const content = target.textContent || ''
      tooltip_el.innerHTML = content
      tooltip_el.style.display = 'block'
      tooltip_el.style.left = `${x}px`
      tooltip_el.style.top = `${y}px`
      target.style.cursor = 'pointer'

      if (is_half) {
        tooltip_el.style.top = `${y - tooltip_el.clientHeight}px`
      }
    })
  }

  function hideTip(e: MouseEvent) {
    const el = document.getElementById(tooltip_id) as HTMLElement
    const target = e.target as HTMLElement
    target.style.cursor = ''
    el.style.display = 'none'
  }

  return {
    setTips,
    hideTip,
  }
}
