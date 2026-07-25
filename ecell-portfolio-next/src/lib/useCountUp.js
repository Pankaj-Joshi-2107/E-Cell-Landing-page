import { animate } from 'animejs'

/**
 * Parses strings like "$1.2M raised", "$650K raised", "210", "Bootstrapped"
 * into { prefix, target, decimals, unit, suffix } so the numeric part can be
 * tweened independently of the surrounding text.
 *
 * Returns null for strings with no numeric part (e.g. "Bootstrapped") —
 * callers should just render those as static text.
 */
export function parseStatValue(raw) {
  const match = String(raw).match(/^([^\d]*)([\d,]+(?:\.\d+)?)\s*([kKmMbB]?)\s*(.*)$/)
  if (!match) return null

  const [, prefix, numStr, unit, suffix] = match
  const target = parseFloat(numStr.replace(/,/g, ''))
  if (Number.isNaN(target)) return null

  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0

  return { prefix, target, decimals, unit: unit.toUpperCase(), suffix }
}

function formatStat(value, { prefix, decimals, unit, suffix }) {
  const num = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()
  return `${prefix}${num}${unit}${suffix}`
}

/**
 * Animates the numeric part of `el`'s text content up from 0 to its target
 * value, stopwatch-style, using anime.js to tween a plain counter object.
 *
 * If the text has no numeric part, it's just written as-is (no animation).
 */
export function animateCountUp(el, rawText, { duration = 1200, delay = 0, ease = 'outExpo' } = {}) {
  if (!el) return

  const parsed = parseStatValue(rawText)
  if (!parsed) {
    el.textContent = rawText
    return
  }

  const counter = { value: 0 }
  el.textContent = formatStat(0, parsed)

  animate(counter, {
    value: parsed.target,
    duration,
    delay,
    ease,
    onUpdate: () => {
      el.textContent = formatStat(counter.value, parsed)
    }
  })
}
