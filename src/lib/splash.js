/**
 * Dismisses the preloader baked into index.html.
 *
 * The intro animates entirely from CSS — see the long comment in index.html for
 * why (compositor-only properties, so it stays smooth while React mounts). This
 * module runs no animation of its own; it only decides when the intro is over.
 *
 * The rule:
 *   - show it for INTRO_MS, which is what the CSS is timed to
 *   - if the fonts or hero image are somehow still not ready by then, hold a
 *     little longer rather than revealing a half-drawn page
 *   - never hold past INTRO_MS + GRACE_MS, whatever happens
 */

/** Intro length. Must stay in step with `--sp-intro` in index.html. */
const INTRO_MS = 5000

/** Extra time we're willing to wait on assets after the intro has played. */
const GRACE_MS = 2000

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let dismissed = false

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

export async function dismissSplash() {
  if (dismissed) return
  dismissed = true

  const el = document.getElementById('splash')
  if (!el || el.dataset.state === 'done') return

  const startedAt = window.__splash?.start ?? performance.now()
  const since = () => performance.now() - startedAt

  // Assets almost always land well inside the intro, so this usually resolves
  // long before the timer below.
  await Promise.race([
    Promise.all([fontsReady(), heroImagesReady()]),
    wait(INTRO_MS + GRACE_MS),
  ])

  const remaining = INTRO_MS - since()
  if (remaining > 0) await wait(remaining)

  el.dataset.state = 'done'

  // Drop it from the DOM once the fade is over so it can't trap clicks or focus.
  const remove = () => el.remove()
  el.addEventListener('transitionend', remove, { once: true })
  setTimeout(remove, 1000)
}
