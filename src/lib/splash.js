/**
 * Dismisses the preloader baked into index.html.
 *
 * The markup, styles and progress ring all live in index.html so they paint on
 * the first frame, before this bundle exists. This module only decides *when*
 * the splash has done its job.
 *
 * It waits on real signals, never on a fixed duration:
 *
 *   - webfonts have settled, so the headline doesn't reflow under the visitor
 *   - the hero image has decoded, so the page isn't revealed half-empty
 *
 * with a floor so a warm cache doesn't flash it for 80ms, and a ceiling so a
 * slow connection can never hold the shop hostage. The version of this site
 * before it gated everything behind a hardcoded 2.5s timer that measured
 * nothing at all.
 */

/**
 * Time from first paint until the fade begins — the deliberate length of the
 * brand intro. The ring completion and settle below run *inside* this budget
 * rather than being added to it, so this number is the whole story: 3400ms here
 * means the splash is on screen for 3.4s, then ~0.55s of cross-fade.
 */
const MIN_VISIBLE_MS = 3400

/**
 * Visitors who already saw the intro earlier in the same browsing session.
 * Currently the same as above, so every load looks identical. Drop this to
 * ~600 if you would rather returning visitors skip most of the intro.
 */
const MIN_VISIBLE_REPEAT_MS = 3400

/**
 * Ceiling on *waiting for assets*, not on the intro itself. If fonts or the hero
 * image are still not ready by here, show the page anyway.
 */
const MAX_WAIT_MS = 4500

const RING_MS = 420
const HOLD_MS = 150

const SEEN_KEY = 'sng-splash-seen'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let dismissed = false

/** Returns true the second and later time in a browsing session. */
function seenThisSession() {
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return true
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // Private browsing rejects writes — just treat every visit as the first.
  }
  return false
}

function fontsReady() {
  // Not universal, and it rejects if a font 404s — neither should block paint.
  if (!document.fonts?.ready) return Promise.resolve()
  return document.fonts.ready.catch(() => {})
}

/**
 * Waits for the images <SmartImage> marked `priority`, which are exactly the
 * above-the-fold ones. Errors resolve rather than reject: a missing photo must
 * never strand a visitor on a loading screen.
 */
function heroImagesReady() {
  const imgs = [...document.querySelectorAll('img[data-splash-wait="true"]')]
  if (!imgs.length) return Promise.resolve()

  return Promise.all(
    imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            img.addEventListener('load', resolve, { once: true })
            img.addEventListener('error', resolve, { once: true })
          }),
    ),
  )
}

/** Eases the ring from wherever the inline script left it up to 100%. */
function completeRing(el, duration) {
  return new Promise((resolve) => {
    const from = parseFloat(getComputedStyle(el).getPropertyValue('--p')) || 0
    const start = performance.now()

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      el.style.setProperty('--p', (from + (1 - from) * eased).toFixed(4))
      if (t < 1) requestAnimationFrame(step)
      else resolve()
    }
    requestAnimationFrame(step)
  })
}

export async function dismissSplash() {
  if (dismissed) return
  dismissed = true

  const el = document.getElementById('splash')
  if (!el || el.dataset.state === 'done') return

  const startedAt = window.__splash?.start ?? performance.now()
  const floor = seenThisSession() ? MIN_VISIBLE_REPEAT_MS : MIN_VISIBLE_MS

  await Promise.race([
    Promise.all([fontsReady(), heroImagesReady()]),
    wait(MAX_WAIT_MS),
  ])

  // Hold only for whatever of the floor is left once the ring animation and its
  // brief settle are accounted for.
  const ringMs = Math.min(RING_MS, floor)
  const holdMs = Math.min(HOLD_MS, Math.max(floor - ringMs, 0))
  const budget = floor - ringMs - holdMs
  const elapsed = performance.now() - startedAt
  if (elapsed < budget) await wait(budget - elapsed)

  // Hand the ring over from the inline ramp before finishing it, or the two
  // would fight over the same custom property.
  window.__splash?.stop?.()
  await completeRing(el, ringMs)
  if (holdMs) await wait(holdMs)

  el.dataset.state = 'done'

  // Remove from the DOM once the fade is over so it can't trap clicks or focus.
  const remove = () => el.remove()
  el.addEventListener('transitionend', remove, { once: true })
  setTimeout(remove, 900)
}
