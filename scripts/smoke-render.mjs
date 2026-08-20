/**
 * Renders the whole app once through Vite's SSR pipeline.
 *
 * Catches the class of bug that a build cannot: undefined data reaching a
 * component, bad hook usage, a component throwing on first render. Effects do
 * not run under SSR, so this exercises render paths and state initialisers.
 */
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

// Minimal browser surface for the state initialisers that read it during render.
const listeners = () => ({ addEventListener() {}, removeEventListener() {} })
const classList = {
  _s: new Set(),
  contains(c) { return this._s.has(c) },
  add(c) { this._s.add(c) },
  toggle(c, on) { on ? this._s.add(c) : this._s.delete(c) },
}

globalThis.window = {
  ...listeners(),
  innerWidth: 1440,
  innerHeight: 900,
  scrollY: 0,
  pageYOffset: 0,
  devicePixelRatio: 2,
  matchMedia: () => ({ matches: false, media: '', ...listeners() }),
  getComputedStyle: () => ({ getPropertyValue: () => '4.5' }),
  requestAnimationFrame: (cb) => setTimeout(cb, 0),
  cancelAnimationFrame: clearTimeout,
  scrollTo() {},
  location: { href: 'http://localhost/' },
  IntersectionObserver: class { observe() {} disconnect() {} },
}
globalThis.document = {
  ...listeners(),
  documentElement: { classList, clientWidth: 1440, style: {} },
  body: { style: {}, scrollHeight: 8000 },
  getElementById: () => null,
  activeElement: null,
  createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
}
// Node 24 defines navigator as a getter-only global, so leave it alone.
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} }
globalThis.matchMedia = globalThis.window.matchMedia
globalThis.IntersectionObserver = globalThis.window.IntersectionObserver
globalThis.requestAnimationFrame = globalThis.window.requestAnimationFrame
globalThis.cancelAnimationFrame = globalThis.window.cancelAnimationFrame

const { createServer } = await import('vite')

const server = await createServer({
  root: ROOT,
  configFile: ROOT + 'vite.config.js',
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
})

const warnings = []
const origWarn = console.warn
const origErr = console.error
console.warn = (...a) => warnings.push('WARN: ' + a.join(' '))
console.error = (...a) => warnings.push('ERROR: ' + a.join(' '))

try {
  // React and ReactDOM come straight from Node — routing their CJS entries
  // through Vite's SSR evaluator breaks on `module is not defined`. Vite
  // externalises react for the app graph, so this is the same instance.
  const [React, { renderToStaticMarkup }, { default: App }] = await Promise.all([
    import('react').then((m) => m.default ?? m),
    import('react-dom/server'),
    server.ssrLoadModule('/src/App.jsx'),
  ])

  const html = renderToStaticMarkup(React.createElement(App))

  console.warn = origWarn
  console.error = origErr

  console.log('✓ rendered without throwing')
  console.log('  markup length:', html.length.toLocaleString(), 'chars')

  // Spot-check that the real content actually made it into the output.
  const checks = {
    'hero headline': /Taste/.test(html),
    'section#products': /id="products"/.test(html),
    'section#beverages': /id="beverages"/.test(html),
    'section#about': /id="about"/.test(html),
    'section#tour': /id="tour"/.test(html),
    'section#gallery': /id="gallery"/.test(html),
    'section#bulk': /id="bulk"/.test(html),
    'section#contact': /id="contact"/.test(html),
    '<picture> elements': (html.match(/<picture>/g) || []).length,
    'avif sources': (html.match(/type="image\/avif"/g) || []).length,
    'lqip placeholders': (html.match(/data:image\/webp;base64/g) || []).length,
    'wa.me links': (html.match(/wa\.me\/919998714455/g) || []).length,
    'labels': (html.match(/<label/g) || []).length,
    'gujarati lang attrs': (html.match(/lang="gu"/g) || []).length,
    'soda prices (₹)': (html.match(/₹/g) || []).length,
    'aria-labels': (html.match(/aria-label=/g) || []).length,
  }
  console.log('\ncontent checks:')
  for (const [k, v] of Object.entries(checks)) {
    const ok = typeof v === 'boolean' ? v : v > 0
    console.log(`  ${ok ? '✓' : '✗'} ${k.padEnd(22)} ${typeof v === 'boolean' ? '' : v}`)
  }

  if (warnings.length) {
    console.log('\nreact warnings during render:')
    ;[...new Set(warnings)].slice(0, 20).forEach((w) => console.log('  ' + w.slice(0, 220)))
  } else {
    console.log('\n✓ no React warnings (no invalid DOM props, no key errors)')
  }
} catch (err) {
  console.warn = origWarn
  console.error = origErr
  console.log('✗ RENDER THREW\n')
  console.log(err?.stack?.slice(0, 3000) ?? err)
  process.exitCode = 1
} finally {
  await server.close()
}
