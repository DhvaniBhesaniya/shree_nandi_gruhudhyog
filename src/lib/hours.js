import { useEffect, useState } from 'react'
import { site } from './site'

/**
 * Opening-hours state, evaluated in the shop's own timezone.
 *
 * Uses Asia/Kolkata rather than the visitor's clock so someone browsing from
 * another country isn't told the shop is closed when it's mid-morning in
 * Gandhinagar.
 */
const TZ = 'Asia/Kolkata'

function minutesNowInShopTz() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())

  const get = (type) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  // Midnight can format as "24" in some ICU versions.
  return (get('hour') % 24) * 60 + get('minute')
}

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function getOpenState() {
  const now = minutesNowInShopTz()
  const open = toMinutes(site.hours.open)
  const close = toMinutes(site.hours.close)
  const isOpen = now >= open && now < close

  let detail
  if (isOpen) {
    const left = close - now
    detail =
      left <= 60 ? `Closing in ${left} min` : `Open till ${formatHour(site.hours.close)}`
  } else {
    detail = now < open ? `Opens at ${formatHour(site.hours.open)}` : 'Opens 9 AM tomorrow'
  }

  return { isOpen, detail }
}

function formatHour(hhmm) {
  const [h] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour} ${suffix}`
}

/** Re-evaluates every minute so the badge doesn't go stale on a long visit. */
export function useOpenState() {
  const [state, setState] = useState(getOpenState)

  useEffect(() => {
    const id = setInterval(() => setState(getOpenState()), 60_000)
    return () => clearInterval(id)
  }, [])

  return state
}
