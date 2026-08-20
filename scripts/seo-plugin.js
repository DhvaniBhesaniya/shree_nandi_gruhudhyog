import { site } from '../src/lib/site.js'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const abs = (path) => new URL(path, site.url).href

const TITLE = `${site.name} — Gujarati Farsan, Namkeen & Khakhra in Gandhinagar`

/**
 * LocalBusiness structured data.
 *
 * This is the single highest-leverage SEO addition for a physical shop: it is
 * what lets Google associate the site with the storefront, opening hours and
 * phone number, and surface it for "namkeen near me" style searches.
 *
 * `geo` is deliberately omitted — inventing coordinates would drop the map pin
 * in the wrong place. Add the real lat/lng from the Google Business listing to
 * site.js and it will be included here automatically.
 */
function structuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['GroceryStore', 'FoodEstablishment'],
    '@id': site.url,
    name: site.name,
    alternateName: site.nameGuj,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: abs('og-image.jpg'),
    logo: abs('icon-512.png'),
    priceRange: '₹',
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
        ],
        opens: site.hours.open,
        closes: site.hours.close,
      },
    ],
    hasMap: site.mapsLink,
    areaServed: [
      { '@type': 'City', name: 'Gandhinagar' },
      { '@type': 'City', name: 'Ahmedabad' },
      { '@type': 'State', name: 'Gujarat' },
    ],
    makesOffer: [
      'Namkeen & Farsan', 'Khakhra & Bhakhri', 'Pickles & Achaar',
      'Bakery & Cookies', 'Wafers & Chips', 'Soda Bar', 'Ice Cream',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name } })),
  }

  if (site.geo?.lat && site.geo?.lng) {
    data.geo = { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng }
  }
  if (site.social.instagram) (data.sameAs ??= []).push(site.social.instagram)
  if (site.social.facebook) (data.sameAs ??= []).push(site.social.facebook)

  return data
}

function tags(base) {
  const ogImage = abs('og-image.jpg')
  return `
    <!-- Vite rewrites <link rel="icon"> hrefs for the deploy base but not
         rel="manifest", so this one is emitted with the base already applied. -->
    <link rel="manifest" href="${esc(base)}manifest.webmanifest" />
    <title>${esc(TITLE)}</title>
    <meta name="description" content="${esc(site.description)}" />
    <link rel="canonical" href="${esc(site.url)}" />
    <meta name="author" content="${esc(site.name)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="geo.region" content="IN-GJ" />
    <meta name="geo.placename" content="${esc(site.address.city)}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(site.name)}" />
    <meta property="og:title" content="${esc(TITLE)}" />
    <meta property="og:description" content="${esc(site.description)}" />
    <meta property="og:url" content="${esc(site.url)}" />
    <meta property="og:image" content="${esc(ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(site.name)} storefront in ${esc(site.address.city)}" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:locale:alternate" content="gu_IN" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(TITLE)}" />
    <meta name="twitter:description" content="${esc(site.description)}" />
    <meta name="twitter:image" content="${esc(ogImage)}" />

    <script type="application/ld+json">${JSON.stringify(structuredData())}</script>`
}

/**
 * Injects all head metadata at the `<!-- @seo -->` marker in index.html, and
 * emits robots.txt / sitemap.xml / manifest.webmanifest so those stay in sync
 * with site.js too.
 */
/** The generated files, keyed by their served path. */
function staticFiles() {
  return {
    'robots.txt': {
      type: 'text/plain',
      body: `User-agent: *\nAllow: /\n\nSitemap: ${abs('sitemap.xml')}\n`,
    },
    'sitemap.xml': {
      type: 'application/xml',
      body:
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        `  <url>\n    <loc>${site.url}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
        `</urlset>\n`,
    },
    'manifest.webmanifest': {
      type: 'application/manifest+json',
      body: JSON.stringify(
        {
          name: site.name,
          short_name: 'Shree Nandi',
          description: site.description,
          start_url: '.',
          display: 'standalone',
          background_color: '#fdfcfb',
          theme_color: '#e8760c',
          icons: [
            { src: 'apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
            { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
          ],
        },
        null,
        2,
      ),
    },
  }
}

export function seoPlugin() {
  let base = '/'

  return {
    name: 'sng-seo',

    configResolved(config) {
      base = config.base
    },

    /*
     * Serve the generated files in dev too.
     *
     * They are emitted in generateBundle, which only runs for `vite build`. In
     * dev the requests fell through to the SPA fallback and came back as HTML,
     * so the browser reported "Manifest: Line 1, column 1, Syntax error" on
     * every page load.
     */
    configureServer(server) {
      const files = staticFiles()
      server.middlewares.use((req, res, next) => {
        const name = (req.url ?? '').split('?')[0].replace(/^.*\//, '')
        const file = files[name]
        if (!file) return next()
        res.setHeader('Content-Type', file.type)
        res.end(file.body)
      })
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!html.includes('<!-- @seo -->')) {
          this.warn('index.html is missing the <!-- @seo --> marker; no metadata injected')
          return html
        }
        return html.replace('<!-- @seo -->', tags(base))
      },
    },

    generateBundle() {
      for (const [fileName, { body }] of Object.entries(staticFiles())) {
        this.emitFile({ type: 'asset', fileName, source: body })
      }
    },
  }
}
